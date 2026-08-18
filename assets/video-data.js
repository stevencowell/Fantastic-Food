(() => {
  const entries = [
    {
      section: 'm1-s1', module: 1, moduleTitle: 'Kitchen ready', weeks: 'Weeks 1–2',
      title: 'Four Golden Rules of food safety', channel: 'NSWFoodAuthority', youtubeId: 'RUeVNCEDbCo',
      purpose: 'Reinforce four practical food-safety habits before students begin kitchen work.',
      watchFor: 'Name each golden rule and connect it to one action you can take in the school kitchen.'
    },
    {
      section: 'm1-s2', module: 1, moduleTitle: 'Kitchen ready', weeks: 'Weeks 1–2',
      title: 'How Does Cross-Contamination Happen?', channel: 'USDAFoodSafety', youtubeId: 'Xm_X5LJmrbw',
      purpose: 'Make contamination pathways visible so personal-hygiene routines have a clear reason.',
      watchFor: 'Trace how contamination moves, then identify where clean hands and careful handling break the pathway.'
    },
    {
      section: 'm1-s3', module: 1, moduleTitle: 'Kitchen ready', weeks: 'Weeks 1–2',
      title: 'Clean as you go and deep cleaning', channel: 'Food Consulting Services', youtubeId: 'w8lqqCaKGHg',
      purpose: 'Compare cleaning during production with the thorough cleaning completed at the end.',
      watchFor: 'Sort the examples into clean-as-you-go actions and end-of-task cleaning actions.'
    },
    {
      section: 'm2-s1', module: 2, moduleTitle: 'Recipes and nutrients', weeks: 'Weeks 3–4',
      title: 'How to Read a Recipe | Jessi Holden, MS, RDN', channel: 'The Kitchen Invitation', youtubeId: 'NFSZB4dGI_s',
      purpose: 'Show how a complete recipe read-through supports preparation, sequencing and checking.',
      watchFor: 'Notice what is checked before cooking: ingredients, quantities, equipment, unfamiliar terms and the full method.'
    },
    {
      section: 'm2-s2', module: 2, moduleTitle: 'Recipes and nutrients', weeks: 'Weeks 3–4',
      title: 'How to measure dry and liquid ingredients', channel: 'Citytv', youtubeId: '89omDmw6m_Y',
      purpose: 'Demonstrate why the measuring tool and reading position matter for accurate results.',
      watchFor: 'Compare the tools and techniques used for dry and liquid ingredients, including how each amount is checked.'
    },
    {
      section: 'm2-s3', module: 2, moduleTitle: 'Recipes and nutrients', weeks: 'Weeks 3–4',
      title: 'nutrition- Six essential nutrients', channel: 'RGMG Education', youtubeId: '93br2D8rTAQ',
      purpose: 'Review the six nutrient groups and their broad roles in the body.',
      watchFor: 'Record the six groups and one broad body role or food-source example for each.'
    },
    {
      section: 'm3-s1', module: 3, moduleTitle: 'Workflow and healthy choices', weeks: 'Weeks 5–6',
      title: 'Master the Art of Mise En Place: Organize Like a Pro', channel: 'WebstaurantStore', youtubeId: '4h1imzBn8pE',
      purpose: 'Show how preparation and organisation create a calmer, more efficient kitchen workflow.',
      watchFor: 'List what is organised before cooking and explain how that preparation protects the later sequence.'
    },
    {
      section: 'm3-s2', module: 3, moduleTitle: 'Workflow and healthy choices', weeks: 'Weeks 5–6',
      title: 'Five Food Groups', channel: 'Foodbank SA & NT', youtubeId: 'fWZuiMrxPg0',
      purpose: 'Reinforce the five food groups represented in the Australian Guide to Healthy Eating.',
      watchFor: 'Name the five groups and notice why variety across the groups matters more than relying on one food.'
    },
    {
      section: 'm3-s3', module: 3, moduleTitle: 'Workflow and healthy choices', weeks: 'Weeks 5–6',
      title: 'Understanding Criteria and Constraints', channel: 'Chorus Educational K-12 Content', youtubeId: 'SIj7CuwdVDA',
      purpose: 'Separate the intended result of a recipe change from the limits that the change must respect.',
      watchFor: 'Identify one example of a success criterion and one example of a constraint, then apply both to a permitted recipe change.'
    },
    {
      section: 'm4-s1', module: 4, moduleTitle: 'Lunchbox design', weeks: 'Weeks 7–8',
      title: 'What is SWAP IT?', channel: 'Good For Kids', youtubeId: 'mjb4niYijsg',
      purpose: 'Use an Australian school-lunchbox example to consider realistic everyday food choices.',
      watchFor: 'Notice how a lunchbox choice can be improved while remaining practical for the student and the school day.'
    },
    {
      section: 'm4-s2', module: 4, moduleTitle: 'Lunchbox design', weeks: 'Weeks 7–8',
      title: 'Cooking Techniques: Converting Recipe Yields', channel: 'ILExtensionHMRS', youtubeId: 'a2RAbjkbbMo',
      purpose: 'Connect planned serves to accurate ingredient quantities before a food order is completed.',
      watchFor: 'Follow how quantities change when the required yield changes, and note which checks prevent ordering errors.'
    },
    {
      section: 'm4-s3', module: 4, moduleTitle: 'Lunchbox design', weeks: 'Weeks 7–8',
      title: 'How to Evaluate Design Solutions', channel: 'Chorus Educational K-12 Content', youtubeId: 'IqUjftjsnyI',
      purpose: 'Model how criteria and evidence support a judgement about a redesigned food solution.',
      watchFor: 'Listen for testing, feedback and comparison, then identify the evidence needed to justify one improvement.'
    },
    {
      section: 'm5-s1', module: 5, moduleTitle: 'Evaluate and complete', weeks: 'Weeks 9–10',
      title: 'Dietary Fibre: The Most Important Nutrient? Best Fiber Foods?', channel: 'Free Animated Education', youtubeId: '_qo5Bllt1_M',
      purpose: 'Explain how dietary fibre supports digestion and why sufficient water matters alongside it.',
      watchFor: 'Trace fibre through the digestive explanation and identify the specific point where water supports normal function.'
    },
    {
      section: 'm5-s2', module: 5, moduleTitle: 'Evaluate and complete', weeks: 'Weeks 9–10',
      title: 'How to Write a Time Plan || Food, Nutrition and Health || Eps 3', channel: 'The Foods Teacher', youtubeId: '0vICpqEVK8o',
      purpose: 'Turn a recipe method into an ordered, workable practical sequence.',
      watchFor: 'Look for setup, dependent steps, useful task overlap, progress checks and protected clean-up time.'
    },
    {
      section: 'm5-s3', module: 5, moduleTitle: 'Evaluate and complete', weeks: 'Weeks 9–10',
      title: 'Principles of Human-Centered Design (Don Norman)', channel: 'NNgroup', youtubeId: 'rmM0kRf8Dbk',
      purpose: 'Connect audience needs and evidence to the evaluation of a food solution and its communication tool.',
      watchFor: 'Notice the difference between designing from assumptions and using evidence about the people who will use the solution.'
    }
  ].map(entry => ({
    ...entry,
    url: `https://www.youtube.com/watch?v=${entry.youtubeId}`,
    thumbnail: `https://i.ytimg.com/vi/${entry.youtubeId}/hqdefault.jpg`,
    embed: `https://www.youtube-nocookie.com/embed/${entry.youtubeId}`,
    theoryUrl: `modules/module-${String(entry.module).padStart(2, '0')}.html#${entry.section}`
  }));

  window.FANTASTIC_FOOD_VIDEOS = {
    version: '1.0.0',
    validatedOn: '2026-08-18',
    course: 'Fantastic Food',
    entries,
    bySection: Object.fromEntries(entries.map(entry => [entry.section, entry]))
  };
})();
