import {
  ProfessionalExperience,
  ResumeData,
} from "@entities/resumes/ResumeTemplate1/api/types";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

const initialState = {
  $resumePhoto: atom<File | null>(null),
  $resumeData: atomWithImmer<ResumeData | null>(null),
  $resumePreset: atomWithImmer<number | null>(null),
  $resumeAvailableSteps: atomWithImmer<number[]>([]),
  $currentResumeStep: atomWithImmer<number>(0),
  $isAfterGeneration: atomWithImmer<boolean>(false),
};

export const StepFormSlice = {
  initialState,
  selectors: {
    $validateFirstStepRequiredFields: atom((get) => {
      const requiredFields = ["name", "role", "email"];
      const resumeData = get(initialState.$resumeData);

      return requiredFields.every(
        (field) =>
          resumeData?.[field as keyof ResumeData] !== undefined &&
          resumeData?.[field as keyof ResumeData] !== ""
      );
    }),

    $validateThirdStepRequiredFields: atom((get) => {
      return get(initialState.$resumePreset) !== null && get(initialState.$resumeData) !== null;
    }),
  },
  actions: {
    $onFirstStepMutation: atom(
      null,
      (
        get,
        set,
        payload: {
          field: keyof ResumeData;
          data: any;
          index?: number;
          subField?: string;
        }
      ) => {
        const { field, data, index, subField } = payload;

        set(initialState.$resumeData, (draft) => {
          // Initialize draft if it's null
          if (!draft) {
            draft = {
              name: "",
              role: "",
              experience: "",
              education: "",
              location: "",
              email: "",
              phoneNumber: "",
              summary: "",
              skills: [],
              professionalPath: [],
              educationDetails: []
            };
          }

          if (typeof index !== "undefined" && subField) {
            if (Array.isArray((draft as ResumeData)[field])) {
              const newArray = [
                ...(draft as ResumeData)[field],
              ] as ProfessionalExperience[];
              newArray[index] = {
                ...newArray[index],
                [subField]: data,
              };
              return {
                ...draft,
                [field]: newArray,
              };
            }
          }

          return {
            ...draft,
            [field]: data,
          };
        });
      }
    ),

    $handleWriteProfessionalExperienceChangeIndex: atom(
      null,
      (
        get,
        set,
        payload: {
          index: number;
          property: keyof ProfessionalExperience;
          value: any;
        }
      ) => {
        const { index, property, value } = payload;
        set(initialState.$resumeData, (draft) => {
          if (draft) {
            draft.professionalPath[index][property] = value;
          }
        });
      }
    ),

    $handlePhotoDeleteMutation: atom(null, (get, set) => {
      set(initialState.$resumePhoto, null);
    }),

    $onResumePresetChangeMutation: atom(null, (get, set, payload: number) => {
      set(initialState.$resumePreset, payload);
    }),

    $fillResumeByAiMutation: atom(null, (get, set, payload: ResumeData) => {
      set(initialState.$resumeData, (draft) => {
        const education = draft?.educationDetails
          ? draft.educationDetails
          : null;
        return {
          ...payload,
          educationDetails: education,
        };
      });
      set(initialState.$isAfterGeneration, true);
    }),

    $handleUpdateResumeDataMutation: atom(null, (get, set, payload: ResumeData) => {
      set(initialState.$resumeData, payload);
    }),

    $handleSetResumePhoto: atom(null, (get, set, payload: File | null) => {
      set(initialState.$resumePhoto, payload);
    }),

    $onAddWorkExpirienceButtonClick: atom(null, (get, set) => {
      set(initialState.$resumeData, (draft) => {
        const newData = { ...draft };

        if (!newData.professionalPath) {
          newData.professionalPath = [];
        }

        newData.professionalPath = [
          ...newData.professionalPath,
          {
            name: "",
            role: "",
            startWork: "",
            endWork: "",
            achievements: [],
            responsibilities: [],
            description: "",
          },
        ];

        return newData;
      });
    }),

    $onDeleteWorkExpirienceButtonClick: atom(
      null,
      (get, set, payload: number) => {
        set(initialState.$resumeData, (draft) => {
          return {
            ...draft,
            professionalPath: draft?.professionalPath.filter(
              (el, i) => i !== payload
            ),
          };
        });
      }
    ),

    $onAddEducationButtonClick: atom(null, (get, set) => {
      set(initialState.$resumeData, (draft) => {
        const newData = { ...draft };

        if (!newData.educationDetails) {
          newData.educationDetails = [];
        }

        newData.educationDetails = [
          ...newData.educationDetails,
          {
            name: "",
            faculty: "",
            speciality: "",
            endYear: "",
            level: 'bachelor',
          },
        ];

        return newData;
      });
    }),

    $onDeleteEducationButtonClick: atom(null, (get, set, payload: number) => {
      set(initialState.$resumeData, (draft) => {
        return {
          ...draft,
          educationDetails: draft?.educationDetails.filter(
            (el, i) => i !== payload
          ),
        };
      });
    }),

    $handleResumeStepChange: atom(null, (get, set, payload: number) => {
      const isAfterAiGeneration = get(initialState.$isAfterGeneration);

      const allowGoSecond = get(
        StepFormSlice.selectors.$validateFirstStepRequiredFields
      );
      const allowGoFourth = get(
        StepFormSlice.selectors.$validateThirdStepRequiredFields
      );
      const allowGoThird = get(
        StepFormSlice.selectors.$validateFirstStepRequiredFields
      );

      const currentStep = get(initialState.$currentResumeStep);

      if (
        (payload === 1 && allowGoSecond) ||
        payload === 2  ||
        (payload === 3 && allowGoThird ) ||
        (payload === 4 && allowGoFourth && isAfterAiGeneration) ||
        currentStep >= payload
      ) {
        set(initialState.$currentResumeStep, payload);
      }
    }),

    // Add pseudo-fill feature using AI
    $fillResumeWithAiData: atom(null, (get, set) => {
      const currentData = get(initialState.$resumeData);
      
      const aiGeneratedData: ResumeData = {
        name: currentData?.name || "John Doe",
        role: currentData?.role || "Senior Software Engineer",
        experience: currentData?.experience || "5 years",
        education: currentData?.education || "Bachelor's in Computer Science",
        location: currentData?.location || "San Francisco, CA",
        email: currentData?.email || "john.doe@example.com",
        phoneNumber: "+1 (555) 123-4567",
        summary: currentData?.summary || "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve business objectives.",
        skills: currentData?.skills?.length ? currentData.skills : [
          "JavaScript", "TypeScript", "React", "Node.js", "Python", 
          "AWS", "Docker", "PostgreSQL", "MongoDB", "Git"
        ],
        professionalPath: currentData?.professionalPath?.length ? currentData.professionalPath : [
          {
            name: "Tech Solutions Inc.",
            role: "Senior Software Engineer",
            description: "Led development of enterprise-level web applications serving 100k+ users",
            startWork: "01.2022",
            endWork: "Present",
            achievements: [
              "Improved application performance by 40% through code optimization",
              "Led a team of 5 developers in delivering critical features",
              "Implemented CI/CD pipeline reducing deployment time by 60%"
            ],
            responsibilities: [
              "Architected and developed scalable web applications",
              "Mentored junior developers and conducted code reviews",
              "Collaborated with product managers to define technical requirements"
            ]
          },
          {
            name: "StartupXYZ",
            role: "Full Stack Developer",
            description: "Developed MVP and core features for a fintech startup",
            startWork: "06.2020",
            endWork: "12.2021",
            achievements: [
              "Built the entire frontend from scratch using React",
              "Designed and implemented RESTful APIs",
              "Achieved 99.9% uptime for production systems"
            ],
            responsibilities: [
              "Developed both frontend and backend components",
              "Integrated third-party payment systems",
              "Maintained and optimized database performance"
            ]
          }
        ],
        educationDetails: currentData?.educationDetails?.length ? currentData.educationDetails : [
          {
            name: "University of California, Berkeley",
            faculty: "Engineering",
            speciality: "Computer Science",
            endYear: "2020",
            level: "bachelor"
          }
        ]
      };

      set(initialState.$resumeData, aiGeneratedData);
      set(initialState.$isAfterGeneration, true);
    }),

    // Initialize empty resume data if none exists
    $initializeResumeData: atom(null, (get, set) => {
      const currentData = get(initialState.$resumeData);
      if (!currentData) {
        const emptyData: ResumeData = {
          name: "",
          role: "",
          experience: "",
          education: "",
          location: "",
          email: "",
          phoneNumber: "",
          summary: "",
          skills: [],
          professionalPath: [],
          educationDetails: []
        };
        set(initialState.$resumeData, emptyData);
      }
    }),
  },
};