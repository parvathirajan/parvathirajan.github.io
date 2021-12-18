const systechSolutions = "Systech Solutions Inc.,";

export const basicData = {
  basic_info: {
    name: "Parvathirajan Natarajan",
    role: "SDE",
    company: "Deloitte India",
    titles: [
      "Software Development Engineer",
      "Data Engineer",
      "Python Developer",
    ],
    social: [
      {
        name: "github",
        url: "https://github.com/parvathirajan",
        class: "fab fa-github",
      },
      {
        name: "stackoverflow",
        url: "https://stackoverflow.com/users/7735255/parvathirajan-natarajan?tab=profile",
        class: "fab fa-stack-overflow",
      },
      {
        name: "linkedin",
        url: "https://www.linkedin.com/in/parvathirajan-natarajan/",
        class: "fab fa-linkedin",
      },
      // {
      //   name: "email",
      //   url: "mailto:parvathi_rajan@hotmail.com",
      //   class: "fa fa-envelope",
      // },
      {
        name: "twitter",
        url: "https://twitter.com/parvathi_rajan",
        class: "fab fa-twitter",
      },
      {
        name: "facebook",
        url: "https://www.facebook.com/ParvathiRajan.N",
        class: "fab fa-facebook",
      },
      {
        name: "instagram",
        url: "https://www.instagram.com/parvathi_rajan_steve/",
        class: "fab fa-instagram",
      },
    ],
    socialLink: {
      github: "https://github.com/parvathirajan",
      myCV: "https://github.com/parvathirajan/parvathirajan/raw/master/Parvathirajan_Natarajan_CV.pdf",
    },
    images: [
      { url: "images/about_i1.jpg" },
      { url: "images/about_i2.jpg" },
      { url: "images/about_i3.jpg" },
      { url: "images/about_i4.jpg" },
      { url: "images/about_i5.jpg" },
    ],
  },
  skills: {
    icons: [
      {
        name: "Python",
        class: "devicon-python-plain",
        level: "95",
      },
      {
        name: "AWS",
        class: "devicon-amazonwebservices-original",
        level: "75",
      },
      {
        name: "Linux",
        class: "devicon-linux-plain",
        level: "60",
      },
      {
        name: "SQL",
        class: "devicon-postgresql-plain",
        level: "60",
      },
      {
        name: "Docker",
        class: "devicon-docker-plain",
        level: "60",
      },
      {
        name: "Git",
        class: "devicon-git-plain",
        level: "60",
      },
      {
        name: "TypeScript",
        class: "devicon-typescript-plain",
        level: "70",
      },
      {
        name: "NodeJS",
        class: "devicon-nodejs-plain",
        level: "85",
      },
      {
        name: "React",
        class: "devicon-react-plain",
        level: "80",
      },
      {
        name: "Java",
        class: "devicon-java-plain",
        level: "90",
      },
    ],
  },
  hobbies: [
    {
      name: "Gaming",
      icon: "gamepad",
      description:
        "Only In-door gamings, mostly Chess. And I'm a Candy Crush Fan.",
    },
    {
      name: "Travel",
      icon: "plane-departure",
      description: "With Friends!!! Always. Or a Long Walk.",
    },
    {
      name: "Learning languages",
      icon: "school",
      description: "Learning Spanish and some South Indian languages",
    },
    {
      name: "Net Junkie",
      icon: "wifi",
      description: "Surfing and Learning through Internet",
    },
    {
      name: "Photography",
      icon: "camera",
      description: "Selfies",
    },
    {
      name: "Trading",
      icon: "dollar-sign",
      description: "Risk-less Investments :P",
    },
  ],
};

export const resumeData = {
  basic_info: {
    salutation: "Hi!",
    description:
      "👋 I'm Parvathirajan Natarajan. I'm a Software Developer, specializing in Framework development and Cloud technologies with 4+ years of IT experience. Experienced with all stages of the development cycle of Data Analytics and Cloud Migration Projects.",
    philosophy:
      "I'm Good in numerous programming languages including Python, Go and good knowledge in SQL, Relational Databases, AWS, Docker, CI/CD, Databricks, Spark, Scala, Apache Airflow, Kafka, etc., Strong background in project management, Agile, and customer relations.",
    preference:
      "Looking for the great opportunity ! Believe in Opportunity makes a man perfect !!",
  },
  projects: [
    {
      title: "Salesforce Connector",
      startDate: "2019",
      description:
        "This program helps to get the data from salesforce through API, either Data Count or Whole data as a CSV file",
      images: [
        "images/portfolio/sf-connector/p1.jpg",
        "images/portfolio/sf-connector/p2.jpg",
      ],
      url: "https://github.com/parvathirajan/salesforce-connector",
      technologies: [
        {
          class: "devicon-python-plain",
          name: "Python",
        },
      ],
    },
    {
      title: "J CTRL",
      startDate: "2020",
      description:
        "With J Ctrl your JSON files can be flatten out as Avro, CSV, Excel, Parquet, XML and etc., - Yet to be deployed in Pypi",
      images: [
        "images/portfolio/j-ctrl/p1.png",
        "images/portfolio/j-ctrl/p2.png",
      ],
      url: "https://github.com/parvathirajan/",
      technologies: [
        {
          class: "devicon-python-plain",
          name: "Python",
        },
      ],
    },
  ],
  education: [
    {
      company: "Anand Institute of Higher Technology, Anna University",
      title: "B.Tech",
      description:
        "Completed B.Tech Information technology in AIHT. The Learning phase for my career where I was concentrated on my Programming languages and logical skills which can be applied in real-time project scenarios. Worked on the Mini Project which we named Smart Crawler. The Project was fully related to the SEO with Java and has been done with Eclipse IDE. The main Motto of the project is to optimize the time consumption of Data retrieval, from multiple web pages with some basic concepts, which was related to the Beta version of Google Web Crawler.",
      years: "2013 - 2017",
      mainTech: ["Information Technology"],
      technologies: [
        "Object-Oriented Programming",
        "Web Development",
        "Web Services",
        "Programming and Software Testing",
        "Agile Software Engineering Principles",
        "Database Systems",
        "Electronic Circuits",
      ],
    },
    {
      company: "YMCA Boys Town Hr. Sec. School",
      title: "High School",
      description:
        "Activities and Societies: Be part of a lot of Cultural activities and won many prizes in the district and state-level Elocution and Drawing competitions.",
      years: "2001 - 2013",
      mainTech: ["Biology", "Maths"],
      technologies: [
        "Zoology",
        "Botany",
        "Mathematics",
        "Physics",
        "Chemistry",
      ],
    },
  ],
  expertise: {
    icons: [
      {
        title: "Full-Stack Web Development",
        description:
          "I have skills and experience to develop full-stack web applications and services in a variety of technologies. My knowledge area for full-stack apps include HTML/CSS/JS, Python, SQL, Serverless (AWS Lambda, API Gateway), ReactJS and etc.,",
      },
      {
        title: "Database Systems",
        description:
          "I have a detailed level of understanding relational database management systems. I have experience with normalization and a wide range of SQL languages, most notably SQL Server, Redshift, Oracle, Dynamo DB and Etc.,",
      },
      {
        title: "Insurance",
        description:
          "I have knowledge in Insurance business and have experience with developing an Insurance site, including the Middle tier and Back end.",
      },
      {
        title: "Project Management",
        description:
          "I have experience with working with project planning. I'm able to work in Agile methodologies such as SCRUM with the inclusion of Various team, Continuous Testing/Delivery, and Jira Boards.",
      },
    ],
  },
  experience: [
    {
      company: "The Fox Corporation",
      title: "Data Engineer",
      description:
        "Fox Corporation is an American mass media company. The company was formed in 2019 as a result of the acquisition of 21st Century Fox by The Walt Disney Company; the assets that were not acquired by Disney were spun off from 21st Century Fox as the new Fox Corp., and its stock began trading on January 1, 2019.",
      responsibilities: [
        "Discussed with onsite lead for getting requirements, Involve in all part of Development Lifecycle.",
        "Preparing documentation – Technical Specification, Design and QA",
        "Managing the on-time project deliverable.",
        "Automate the process with Python Frameworks and Process pipeline to reduce the time and effort",
      ],
      years: "08.2018 - 05.2019",
      mainTech: [systechSolutions],
      technologies: [
        "AWS S3",
        "Redshift",
        "EMR",
        "Lambda",
        "UNIX",
        "Python",
        "Shell",
        "Docker",
        "Bitbucket",
        "Apache Airflow",
        "Kafka",
        "Spark",
        "Databricks",
      ],
    },
    {
      company: "Fox Networks Group",
      title: "Data Engineer",
      description:
        "Fox Networks Group is 21st Century Fox's primary operating unit for TV and Cable.",
      responsibilities: [
        "Discussed with onsite lead for getting requirements – Requirement analysis phase.",
        "Migrate structure from Netezza to AWS RS with AWS SCT.",
        "Do the history load from source DB to the current target when the source data has been refreshed.",
        "Developed the python script for the migration of inbuilt function in Netezza and for the stored procedure.",
        "Prepared all the migration things like DDL and Scripts for the project migration from the Netezza team standpoint.",
        "Managing the on-time project deliverable and providing data load status to the onsite people.",
      ],
      years: "08.2018 - 05.2019",
      mainTech: [systechSolutions],
      technologies: [
        "Netezza",
        "AWS S3",
        "SCT",
        "Redshift",
        "UNIX",
        "Python",
        "Shell",
      ],
    },
    {
      company: "21st Century Fox, Inc.,",
      title: "Data Engineer",
      description:
        "Fox Networks Group is 21st Century Fox's primary operating unit for TV and Cable.",
      responsibilities: [
        "Discussed with client for getting requirements",
        "Developed the python script for the ETL process.",
        "Discussed with the Client regarding the process report and testing during the QA and Development process.",
        "Created documents for the upcoming trainees i.e., Business Document, Operational manual and etc.,",
        "Managing the on-time project deliverable.",
        "Quality Assurance for the developed product.",
      ],
      years: "04.2018 - 08.2018",
      mainTech: [systechSolutions],
      technologies: ["AWS S3", "Amazon Redshift", "UNIX", "Shell", "Python"],
    },
    {
      company: "Tillys: Clothing, Backpacks & Accessories",
      title: "DBA Trainee & Support Engineer",
      description:
        "Tillys is the big textile firm in US and it hah around 220 stores across in USA. They’re maintaining their datawarehouse in the AS400 and getting reports over MSTR. The objective of the project is to support for the ETL part of the project and also provides an end-to-end support that helps good visualization using MSTR. ",
      responsibilities: [
        "Contributed for the development and support of the ETL process.",
        "Validated and tested the data in the table after loading.",
        "Created documents for the upcoming trainees i.e., Business Document, Operational manual and etc.,",
      ],
      years: "12.2017 - 04.2018",
      mainTech: [systechSolutions],
      technologies: ["AS400", "SQL Server"],
    },
  ],
};

export enum sectionNames {
  about = "About me",
  projects = "Projects",
  skills = "Skills",
  education = "Education",
  expertise = "Expertise",
  experience = "Experience",
  experienceAndEducation = "Experience & Education",
  interests = "Interests",
}
