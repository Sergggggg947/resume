export const resumeToolbarConfig = [
    {
      id: "personalInfo",
      cardName: "Personal Information",
      type: "form",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
          <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
        </svg>
      ),
      fields: [
        {
          fieldName: "Имя",
        },
        {
          fieldName: "Фамилия",
        },
        {
          fieldName: "Должность",
        },
        {
          fieldName: "Образование",
        },
        {
          fieldName: "Местоположение",
        },
        {
          fieldName: "Адрес Email",
        },
        {
          fieldName: "Опыт",
        },
        {
          fieldName: "Описание",
        },
      ],
      isCollapsed: true,
    },
    {
      id: "education",
      cardName: "Education",
      type: "form",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="currentColor"/>
        </svg>
      ),
      fields: [
        {
          fieldName: "Имя",
        },
        {
          fieldName: "Фамилия",
        },
        {
          fieldName: "Должность",
        },
        {
          fieldName: "Образование",
        },
        {
          fieldName: "Местоположение",
        },
        {
          fieldName: "Адрес Email",
        },
        {
          fieldName: "Опыт",
        },
        {
          fieldName: "Описание",
        },
      ],
      isCollapsed: true,
    },
    {
      id: "workExpirience",
      cardName: "Work Experience",
      type: "form",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" fill="currentColor"/>
        </svg>
      ),
      fields: [
        [
          {
            fieldName: "Наименование компаи",
          },
          {
            fieldName: "Должность",
          },
          {
            fieldName: "С",
          },
          {
            fieldName: "По",
          },
          {
            fieldName: "Описание",
          },
        ],
      ],
      isCollapsed: false,
    },
    {
      id: "skills",
      cardName: "Skills",
      type: "select",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z" fill="currentColor"/>
        </svg>
      ),
      fields: [],
      isCollapsed: false,
    },
  ];