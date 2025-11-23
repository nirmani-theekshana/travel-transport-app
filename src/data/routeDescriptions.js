const ROUTE_DESCRIPTIONS = {
  'colombo-kandy-fallback': {
    id: 'colombo-kandy-fallback',
    title: 'Colombo to Kandy',
    description:
      'This express service connects Colombo and Kandy with frequent departures throughout the day. It offers comfortable seating, scenic hill-country views, and stops at key towns along the route. Ideal for daily commuters and tourists visiting the Cultural Triangle.',
    schedule: ['First Bus: 5:00 AM', 'Last Bus: 10:00 PM', 'Frequency: Every 30 minutes'],
    duration: 'Approx. 3 hours (depending on traffic)',
    ticketPrice: ['Non-AC: Rs. 320', 'AC: Rs. 500'],
    highlights: [
      'Passes through Kadawatha, Warakapola, and Peradeniya',
      'Scenic hill-country views',
      'Popular among students, workers, and tourists'
    ],
    locationInfo: { start: 'Colombo Fort Bus Stand', end: 'Kandy Goods Shed Bus Stand' },
    mapQuery: 'Colombo to Kandy'
  },

  'colombo-galle-fallback': {
    id: 'colombo-galle-fallback',
    title: 'Colombo to Galle',
    description:
      'Coastal express service between Colombo and Galle with scenic sea-side views. Frequent departures and convenient stops for tourists visiting Galle Fort, beaches and coastal towns.',
    schedule: ['First Bus: 6:00 AM', 'Last Bus: 9:30 PM', 'Frequency: Every 45 minutes'],
    duration: 'Approx. 2.5 hours (depending on traffic)',
    ticketPrice: ['Standard: Rs. 250', 'AC: Rs. 400'],
    highlights: [
      'Runs along the coastal highway',
      'Stops near Mount Lavinia and Hikkaduwa',
      'Great views of the Indian Ocean'
    ],
    locationInfo: { start: 'Colombo Fort Bus Stand', end: 'Galle Central Bus Stand' },
    mapQuery: 'Colombo to Galle'
  },

  'colombo-ella-fallback': {
    id: 'colombo-ella-fallback',
    title: 'Colombo to Ella',
    description:
      'Scenic hill-country route from Colombo to Ella passing tea plantations, waterfalls and mountain views. Recommended for tourists seeking a relaxed journey through the highlands.',
    schedule: ['First Train/Bus: 6:00 AM', 'Last Train/Bus: 8:00 PM', 'Frequency: Several services daily'],
    duration: 'Approx. 6 hours by train (road varies)',
    ticketPrice: ['Standard: Rs. 400', 'Observation: Rs. 750'],
    highlights: [
      'Runs through picturesque tea plantations',
      'Stops near Nuwara Eliya and Haputale',
      'Famous train segment with panoramic views'
    ],
    locationInfo: { start: 'Colombo Fort', end: 'Ella Railway Station' },
    mapQuery: 'Colombo to Ella'
  }
,
  'colombo-rathnapura-fallback': {
    id: 'colombo-rathnapura-fallback',
    title: 'Colombo to Rathnapura',
    description:
      'Direct route connecting Colombo and Rathnapura. This service is commonly used by local commuters and visitors heading to Rathnapura for business or sightseeing. The journey passes through suburban and rural scenery.',
    schedule: ['First Bus: 5:30 AM', 'Last Bus: 8:30 PM', 'Frequency: Several services daily'],
    duration: 'Approx. 2.5 - 3 hours (depending on service and traffic)',
    ticketPrice: ['Standard: Rs. 220', 'AC: Rs. 350'],
    highlights: [
      'Runs via Ratnapura highway',
      'Stops at major junctions and towns en route',
      'Good access to local markets and gem-mining areas'
    ],
    locationInfo: { start: 'Colombo Fort Bus Stand', end: 'Rathnapura Bus Stand' },
    mapQuery: 'Colombo to Rathnapura'
  }
};

export default ROUTE_DESCRIPTIONS;
