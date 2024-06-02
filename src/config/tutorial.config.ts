import TTutorial from "@/model/tutorial";

export const TutorialConfig: TTutorial[] = [
  {
    label: "Tutorial.StepOne.Label",
    description: "Tutorial.StepOne.Description",
    cardOne: {
      isImage: true,
      content: "mouse",
    },
    cardTwo: {
      isImage: true,
      content: "mouse",
    },
  },
  {
    label: "Tutorial.StepTwo.Label",
    description: "Tutorial.StepTwo.Description",
    cardOne: {
      isImage: true,
      content: "mouse",
    },
    cardTwo: {
      isImage: false,
      content: "Cards.mouse.Label",
    },
  },
  {
    label: "Tutorial.StepThree.Label",
    description: "Tutorial.StepThree.Description",
    cardOne: {
      isImage: false,
      content: "Cards.mouse.Label",
    },
    cardTwo: {
      isImage: false,
      content: "Cards.mouse.Description",
    },
  },
];
