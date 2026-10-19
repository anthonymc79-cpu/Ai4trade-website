// One-off content fixes. Changes ONLY what's listed here:
//   1. Header button: "Book a demo" -> "Start a free trial"
//   2. Footer "Book a demo" link -> "Start a free trial"
//   3. For electricians: removes the "Team roles and permissions" card,
//      takes "team" out of two other cards, and points the main button
//      at the free trial
//   4. Deletes the "Team roles and permissions" tutorial and takes
//      "invite your team" out of the getting-started tutorial
// Items you've renamed or moved are simply skipped; nothing else is touched.
//
// Run from the studio folder:
//   npx sanity exec site-fixes.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-01'})
const TRIAL = '/signup/business?plan=trial'

async function exists(id) {
  return client.fetch('defined(*[_id == $id][0]._id)', {id})
}

// Applies `build(patch)` to the published document and to any unpublished draft.
async function patchBoth(id, label, build) {
  for (const docId of [id, `drafts.${id}`]) {
    if (!(await exists(docId))) continue
    await build(client.patch(docId)).commit()
    console.log(`Updated ${label}${docId.startsWith('drafts.') ? ' (draft)' : ''}`)
  }
}

await patchBoth('siteSettings', 'header button and footer', (p) =>
  p
    .set({headerButton: {_type: 'cta', label: 'Start a free trial', href: TRIAL, style: 'primary'}})
    .set({
      'footerColumns[_key=="company"].links[_key=="demo"].label': 'Start a free trial',
      'footerColumns[_key=="company"].links[_key=="demo"].href': TRIAL,
    })
)

await patchBoth('page-for-electricians', 'For electricians page', (p) =>
  p
    .unset(['sections[_key=="features"].items[_key=="tea"]'])
    .set({
      'sections[_key=="features"].items[_key=="sub"].label': 'SUB-05',
      'sections[_key=="features"].items[_key=="job"].description':
        'Track enquiries, quotes, scheduled work, and completed jobs in one place — no spreadsheets, no missed callbacks.',
      'sections[_key=="features"].items[_key=="flr"].description':
        'Sketch circuits on site on a tablet, and turn them into a floorplan you can refer back to on the next visit.',
      'hero.buttons[_key=="start"].label': 'Start your free trial',
      'hero.buttons[_key=="start"].href': TRIAL,
    })
)

for (const id of ['tutorial-advanced-team-permissions', 'drafts.tutorial-advanced-team-permissions']) {
  if (await exists(id)) {
    await client.delete(id)
    console.log(`Deleted the team permissions tutorial${id.startsWith('drafts.') ? ' (draft)' : ''}`)
  }
}

await patchBoth('tutorial-getting-started', 'Getting started tutorial', (p) =>
  p.set({
    description: 'Set up your business profile and take your first job from enquiry to invoice.',
  })
)

await patchBoth('tutorial-building-a-floorplan', 'Floorplan tutorial', (p) =>
  p.set({
    description:
      "Sketch a property's circuits on site and turn it into a floorplan you can refer back to.",
  })
)

console.log('Done.')
