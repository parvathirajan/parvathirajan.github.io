#!/usr/bin/env python3
"""Conservative cleanup of old per-user cache and log files on macOS.

The script is a dry run unless --apply is supplied. It never scans system-wide
folders, does not follow symbolic links, and only removes regular files older
than the requested age from ~/Library/Caches and ~/Library/Logs.
"""

from __future__ import annotations

import argparse
import os
import sys
import time
from pathlib import Path


DEFAULT_DAYS = 30
ALLOWED_RELATIVE_ROOTS = (Path("Library/Caches"), Path("Library/Logs"))


def human_size(size: int) -> str:
    value = float(size)
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if value < 1024 or unit == "TB":
            return f"{value:.1f} {unit}"
        value /= 1024
    raise AssertionError("unreachable")


def old_regular_files(root: Path, cutoff: float):
    """Yield old regular files below root without following symlinks."""
    for current, directories, files in os.walk(root, followlinks=False):
        current_path = Path(current)
        directories[:] = [
            name for name in directories if not (current_path / name).is_symlink()
        ]
        for name in files:
            path = current_path / name
            try:
                stat = path.lstat()
                if path.is_symlink() or not path.is_file() or stat.st_mtime >= cutoff:
                    continue
                yield path, stat.st_size
            except (FileNotFoundError, PermissionError, OSError):
                continue


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="delete matching files (without this flag, only report them)",
    )
    parser.add_argument(
        "--older-than-days",
        type=int,
        default=DEFAULT_DAYS,
        metavar="DAYS",
        help=f"only select files not modified for DAYS (default: {DEFAULT_DAYS})",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.older_than_days < 7:
        print("Refusing: --older-than-days must be at least 7.", file=sys.stderr)
        return 2

    home = Path.home().resolve()
    roots = [(home / relative).resolve() for relative in ALLOWED_RELATIVE_ROOTS]
    cutoff = time.time() - args.older_than_days * 24 * 60 * 60
    total_bytes = 0
    selected = 0
    deleted = 0
    failed = 0

    print("Mode:", "DELETE" if args.apply else "DRY RUN")
    print(f"Selecting files older than {args.older_than_days} days.\n")

    for root in roots:
        if not root.is_dir() or home not in root.parents:
            print(f"Skipping unavailable or unsafe path: {root}")
            continue
        print(f"Scanning {root}")
        for path, size in old_regular_files(root, cutoff):
            selected += 1
            total_bytes += size
            if not args.apply:
                continue
            try:
                path.unlink()
                deleted += 1
            except (PermissionError, FileNotFoundError, OSError) as error:
                failed += 1
                print(f"  Could not delete {path}: {error}", file=sys.stderr)

    print(f"\nFound {selected:,} old files totaling {human_size(total_bytes)}.")
    if args.apply:
        print(f"Deleted {deleted:,} files; {failed:,} could not be deleted.")
        print("Restart affected apps if they were open during cleanup.")
    else:
        print("Nothing was deleted. Re-run with --apply after reviewing this total.")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
