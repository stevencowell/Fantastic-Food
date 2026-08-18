(() => {
  const visuals = {
    'm1-s1': ['Ready to Work Safely in Food Technology', 'Teacher directions, hazard awareness, stopping when unsure and asking for guidance.'],
    'm1-s2': ['Personal Hygiene for Safe Food Work', 'A personal-hygiene pathway for recognising an interruption, restoring hygiene and returning carefully.'],
    'm1-s3': ['Kitchen Hygiene, Hazards and Washing Up', 'Hazard and hygiene observations leading to safe reporting, teacher guidance and orderly completion.'],
    'm2-s1': ['Reading Recipes: Scones and Savoury Twists', 'A recipe-reading pathway through title, ingredients, quantities, equipment and method sequence.'],
    'm2-s2': ['Accurate Measuring and Managing a Practical', 'A check-before-mixing pathway for quantities, units, suitable tools and careful confirmation.'],
    'm2-s3': ['The Six Essential Nutrients', 'Connections between the six nutrient groups, broad body roles, hydration and variety.'],
    'm3-s1': ['Workflow Planning in the Kitchen', 'A workflow map connecting dependencies, sequence, waiting time, progress checks and clean-up.'],
    'm3-s2': ['The Australian Guide to Healthy Eating and Adolescent Needs', 'The five food groups, water as the preferred drink, variety and broad adolescent needs.'],
    'm3-s3': ['Recipe Modification: Bread Cases and Garlic Cheese Flatbread', 'A design cycle from goal and permitted change through prediction, production, evaluation and improvement.'],
    'm4-s1': ['Planning a Balanced Lunchbox', 'Audience, school-day needs, food-group variety, water, practicality and whole-plan review.'],
    'm4-s2': ['Food Orders and Practical Organisation', 'A food-order checking pathway for items, quantities, planned use and workflow.'],
    'm4-s3': ['Coconut Balls Practical and Healthier Fast-Food Redesign', 'A food-solution design pathway using user, purpose, criteria, evidence, evaluation and improvement.'],
    'm5-s1': ['Fibre and Water for Healthy Bodies', 'Different but connected roles for fibre, water, varied plant foods and normal body functions.'],
    'm5-s2': ['Fettuccine Carbonara: Sequencing and Safe Workflow', 'A practical workflow from reading the current recipe to dependencies, checks, evaluation and clean-up.'],
    'm5-s3': ['Communicating and Evaluating Food Solutions', 'A website evaluation pathway connecting audience, purpose, content, appeal, ease of use, evidence and improvement.']
  };
  const key = new URLSearchParams(location.search).get('section');
  const item = visuals[key] || visuals['m1-s1'];
  const moduleNumber = Number((key || 'm1-s1').match(/^m(\d)/)?.[1] || 1);
  document.title = `${item[0]} visual | Fantastic Food`;
  document.querySelector('[data-visual-title]').textContent = item[0];
  document.querySelector('[data-visual-caption]').textContent = item[1];
  const image = document.querySelector('[data-visual-image]');
  image.src = `assets/visuals/${visuals[key] ? key : 'm1-s1'}.svg`;
  image.alt = item[1];
  const back = document.querySelector('[data-visual-back]');
  back.href = `modules/module-${String(moduleNumber).padStart(2, '0')}.html#${visuals[key] ? key : 'm1-s1'}`;
  back.textContent = `← Return to Module ${moduleNumber}`;
})();
