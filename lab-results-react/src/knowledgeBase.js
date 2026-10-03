export const knowledgeBase = {
  ferritin: {
    displayName: "Ferritin (iron stores)",
    unit: "ng/mL",
    lowBelow: 30,
    highAbove: 300,
    low: {
      meaning:
        "Your iron stores may be low, which can cause tiredness, weakness, or pale skin.",
      diet: [
        "Iron-rich foods such as red meat, poultry, fish, lentils, beans, and spinach",
        "Eat vitamin C foods (oranges, peppers, tomatoes) with iron-rich meals to help absorption",
        "Avoid drinking coffee or tea right with meals, since they can reduce iron absorption",
      ],
      askDoctorAbout: [
        "Whether an iron supplement is right for you, and what dose",
        "What may be causing low iron",
        "When to retest your levels",
      ],
      urgentIf: ["Chest pain", "Shortness of breath", "Fainting"],
    },
    high: {
      meaning:
        "Your ferritin is above the usual range. This can have many causes, including inflammation.",
      diet: ["Avoid iron supplements unless your doctor tells you to take them"],
      askDoctorAbout: [
        "What may be causing the high level",
        "Whether more testing is needed",
      ],
      urgentIf: ["Severe abdominal pain", "Chest pain"],
    },
  },

  ldl: {
    displayName: "LDL cholesterol",
    unit: "mg/dL",
    lowBelow: null,
    highAbove: 130,
    high: {
      meaning:
        "Your LDL ('bad') cholesterol is higher than recommended, which can raise heart disease risk over time.",
      diet: [
        "Eat more fiber: oats, beans, fruits, and vegetables",
        "Choose fish, nuts, and olive oil instead of fried or processed foods",
        "Limit saturated fat (fatty red meat, butter, full-fat dairy)",
        "Aim for regular physical activity, as your doctor recommends",
      ],
      askDoctorAbout: [
        "Your overall heart risk",
        "Whether lifestyle changes alone are enough or if medication should be considered",
        "When to repeat the test",
      ],
      urgentIf: ["Chest pain or pressure", "Sudden shortness of breath"],
    },
  },

  vitamin_d: {
    displayName: "Vitamin D (25-OH)",
    unit: "ng/mL",
    lowBelow: 20,
    highAbove: 100,
    low: {
      meaning:
        "Your vitamin D level is low, which can affect bone health and muscle strength.",
      diet: [
        "Foods with vitamin D: fatty fish (salmon, sardines), egg yolks, fortified milk and cereals",
        "Safe time outdoors, since sunlight helps your body make vitamin D",
      ],
      askDoctorAbout: [
        "Whether you need a vitamin D supplement and what dose",
        "When to retest your levels",
      ],
      urgentIf: [
        "Severe bone pain",
        "Muscle weakness that is getting worse",
      ],
    },
    high: {
      meaning:
        "Your vitamin D level is above the usual range, often from too many supplements.",
      diet: ["Pause vitamin D supplements only after checking with your doctor"],
      askDoctorAbout: ["Whether to adjust your supplements"],
      urgentIf: ["Nausea, vomiting, or confusion"],
    },
  },
};
