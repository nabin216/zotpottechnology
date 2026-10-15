// Real client projects, shown on the "Our work" page, on the home page and on
// matching service pages. While this list is empty, all of those sections and
// the "Our work" menu link stay hidden, so the site never shows fake work.
//
// Only publish projects you delivered and have permission to show.
// To add one, put a screenshot in src/assets/work/, import it at the top of
// this file, and add an entry like this:
//
//   import bakeryShot from '../assets/work/bakery.jpg'
//
//   {
//     id: 'example-bakery',
//     title: 'Online ordering for a local bakery',
//     client: 'Example Bakery, Manchester',          // or 'Local bakery' if anonymous
//     services: ['web-development'],                 // category ids from services.js
//     image: bakeryShot,                              // optional
//     link: 'https://examplebakery.com',              // optional, live site
//     problem: 'Orders came in by phone and were often missed at busy times.',
//     solution: 'A Shopify store with click-and-collect slots and order notifications.',
//     tech: ['Shopify', 'Klaviyo'],
//     outcome: 'Phone orders replaced by online orders within the first month.',
//     testimonial: { quote: '...', name: 'Jane Doe', role: 'Owner' },  // optional, with permission
//   },

export const projects = []

export function projectsFor(categoryId) {
  return projects.filter(p => p.services.includes(categoryId))
}
