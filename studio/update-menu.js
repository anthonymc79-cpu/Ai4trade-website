// One-off update to Site settings. Changes ONLY:
//   - the header menu
//   - the links in the footer's "Homeowners" column
// Everything else (header button, other footer columns, contact email...)
// is left exactly as it is.
//
// Run from the studio folder:
//   npx sanity exec update-menu.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-01'})

const navigation = [
  {_key: 'electricians', _type: 'navItem', label: 'For electricians', href: '/for-electricians'},
  {_key: 'homeowners', _type: 'navItem', label: 'Homeowners', href: '/homeowners'},
  {_key: 'pricing', _type: 'navItem', label: 'Pricing', href: '/pricing'},
  {_key: 'tutorials', _type: 'navItem', label: 'Tutorials', href: '/tutorials'},
]

const homeownerLinks = [
  {_key: 'how', _type: 'link', label: 'How it works', href: '/homeowners'},
  {_key: 'guides', _type: 'link', label: 'Homeowner guides', href: '/tutorials/homeowners'},
]

for (const id of ['siteSettings', 'drafts.siteSettings']) {
  const doc = await client.fetch('*[_id == $id][0]{_id, "hasHomeowners": defined(footerColumns[_key == "homeowners"][0])}', {id})
  if (!doc) continue
  let patch = client.patch(id).set({navigation})
  if (doc.hasHomeowners) {
    patch = patch.set({'footerColumns[_key=="homeowners"].links': homeownerLinks})
  }
  await patch.commit()
  console.log(`Updated ${id}${doc.hasHomeowners ? ' (menu and footer)' : ' (menu)'}`)
}
console.log('Done.')
