import {
  AFoodLover,
  AFoodLoverBanner,
  AdventureAwaits,
  AdventureAwaitsBanner,
  ClaraWilsonAvatar,
  CulturalJourneys,
  EmilyFosterAvatar,
  EthanWalkerAvatar,
  IslandEscapes,
  LauraMartinezAvatar,
  LiamTaylorAvatar,
  LuxuryBudget,
  SophiaTurnerAvatar,
  UltimateGuideSolo,
} from '@/assets/images';
import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ultimate-guide-solo-travel',
    title:
      'Ultimate Guide to Solo Travel: Tips and Tricks for Every Adventurer',
    image: UltimateGuideSolo,
    author: {
      name: 'Emily Foster',
      avatar: EmilyFosterAvatar,
      role: 'Author',
    },
    date: 'Nov 29, 2024',
    readTime: '4 Mins Read',
    introduction:
      "Embarking on a solo travel adventure is one of the most liberating experiences you can have. Whether you're a seasoned traveler or planning your first solo trip, this guide will provide you with essential tips and tricks to make your journey safe, enjoyable, and unforgettable.",
    mainImage: UltimateGuideSolo,
    subtitle:
      "Here's everything you need to know to plan and execute the perfect solo travel experience.",
    content: {
      type: 'countries',
      sections: [
        {
          country: 'Planning Your Solo Adventure',
          listCountry: [
            'Research your destination thoroughly',
            'Create a flexible itinerary',
            'Book accommodations in safe neighborhoods',
          ],
        },
        {
          country: 'Safety First',
          listCountry: [
            'Share your itinerary with trusted contacts',
            'Stay aware of your surroundings',
            'Trust your instincts',
          ],
        },
      ],
    },
    conclusion:
      "Solo travel opens up a world of possibilities for personal growth and adventure. With proper planning and the right mindset, you'll discover not only new places but also a deeper understanding of yourself. Happy travels!",
  },
  {
    id: '2',
    slug: 'food-lovers-journey-culinary-destinations',
    title: "A Food Lover's Journey: Top Culinary Destinations Around The World",
    image: AFoodLover,
    author: {
      name: 'Liam Taylor',
      avatar: LiamTaylorAvatar,
      role: 'Author',
    },
    date: 'Nov 29, 2024',
    readTime: '5 Mins Read',
    introduction:
      'Europe is a treasure trove of culinary delights, offering food enthusiasts an incredible journey through diverse flavors, traditions, and cooking techniques. From the sophisticated haute cuisine of France to the comforting simplicity of Italian dishes, each country presents its own unique gastronomic identity.',
    mainImage: AFoodLoverBanner,
    subtitle:
      "Here's a country-by-country guide to some of the best culinary experiences in Europe.",
    content: {
      type: 'countries',
      sections: [
        {
          country: 'France: Haute Cuisine and Pastries',
          listCountry: [
            'Must-Try Dishes: Coq au Vin, Ratatouille, and Bouillabaisse.',
            'Signature Experience: Savoring a croissant and espresso at a Parisian café or dining at a Michelin-starred restaurant in Lyon.',
            'Don’t Miss: A wine-tasting tour in Bordeaux or Champagne.',
          ],
        },
        {
          country: 'Italy: The Heart of Comfort Food',
          listCountry: [
            'Must-Try Dishes: Pizza Margherita, Risotto alla Milanese, and Gelato.',
            'Signature Experience: Enjoying fresh pasta in Bologna or a Neapolitan pizza in Naples.',
            'Don’t Miss: A vineyard tour in Tuscany to sample Chianti wines.',
          ],
        },
        {
          country: 'Spain: Tapas and Seafood',
          listCountry: [
            'Must-Try Dishes: Paella, Jamón Ibérico, and Gazpacho.',
            'Signature Experience: A tapas crawl in Seville or tasting pintxos in the Basque Country.',
            'Don’t Miss: Experiencing a traditional flamenco dinner show.',
          ],
        },
        {
          country: 'Germany: A Celebration of Beer and Bread',
          listCountry: [
            'Must-Try Dishes: Bratwurst, Sauerbraten, and Pretzels.',
            'Signature Experience: Attending Oktoberfest in Munich or exploring the Christmas markets for seasonal treats.',
            'Don’t Miss: Sampling craft beers in Berlin’s burgeoning brewery scene.',
          ],
        },
        {
          country: 'Greece: Mediterranean Magic',
          listCountry: [
            'Must-Try Dishes: Moussaka, Souvlaki, and Baklava.',
            'Signature Experience: Dining by the sea in Santorini or Crete with fresh seafood and local wine.',
            'Don’t Miss: A cooking class to learn traditional Greek recipes.',
          ],
        },
        {
          country: 'Portugal: Flavors of the Atlantic',
          listCountry: [
            'Must-Try Dishes: Bacalhau à Brás, Pastéis de Nata, and Sardinhas Assadas.',
            'Signature Experience: Exploring the food markets in Lisbon or enjoying a Port wine tour in Porto.',
            'Don’t Miss: Tasting freshly caught seafood in a coastal village.',
          ],
        },
        {
          country: 'Belgium: Chocolate and Beyond',
          listCountry: [
            'Must-Try Dishes: Moules-frites, Stoofvlees, and Belgian waffles.',
            'Signature Experience: A chocolate-tasting tour in Brussels or sampling beer in Bruges.',
            'Don’t Miss: Pairing local beers with artisanal cheeses.',
          ],
        },
        {
          country: 'Switzerland: Alpine Flavors',
          listCountry: [
            'Must-Try Dishes: Fondue, Raclette, and Rösti.',
            'Signature Experience: Dining in a chalet with stunning mountain views or touring a Swiss chocolate factory.',
            'Don’t Miss: Exploring local markets for high-quality cheeses.',
          ],
        },
      ],
    },
    conclusion:
      'Each country in Europe offers a unique culinary adventure, blending tradition and innovation. Whether you’re sipping wine in Tuscany, enjoying tapas in Seville, or savoring pastries in Paris, Europe’s diverse food culture ensures an unforgettable journey for every foodie. Bon appétit!',
  },
  {
    id: '3',
    slug: 'adventure-awaits-best-national-parks-2025',
    title: 'Adventure Awaits: The Best National Parks to Visit in 2025',
    image: AdventureAwaits,
    author: {
      name: 'Clara Wilson',
      avatar: ClaraWilsonAvatar,
      role: 'Author',
    },
    date: 'Nov 29, 2024',
    readTime: '6 Mins Read',
    introduction:
      "National parks are nature's greatest treasures, offering breathtaking landscapes, diverse wildlife, and opportunities for adventure that can transform your perspective on the natural world. As we look ahead to 2025, here are the most spectacular national parks around the globe that deserve a spot on your travel bucket list.",
    mainImage: AdventureAwaitsBanner,
    subtitle:
      "Discover the world's most stunning protected areas and plan your next outdoor adventure.",
    content: {
      type: 'countries',
      sections: [
        {
          country: 'Yosemite National Park, USA',
          listCountry: [
            'Half Dome hike',
            'El Capitan rock climbing',
            'Yosemite Falls viewing',
          ],
        },
        {
          country: 'Banff National Park, Canada',
          listCountry: [
            'Lake Louise kayaking',
            'Moraine Lake photography',
            'Sulphur Mountain gondola',
          ],
        },
        {
          country: 'Torres del Paine, Chile',
          listCountry: [
            'W Circuit trek',
            'Grey Glacier boat tour',
            'Wildlife spotting',
          ],
        },
      ],
    },
    conclusion:
      "National parks offer some of the most transformative travel experiences available. Whether you're seeking adventure, tranquility, or simply a connection with nature, these protected areas provide an escape from the everyday and a reminder of the planet's incredible beauty. Start planning your 2025 adventure today!",
  },
  {
    id: '4',
    slug: 'island-escapes-beautiful-islands-2025',
    title: 'Island Escapes: The Most Beautiful Islands to Visit in 2025',
    image: IslandEscapes,
    author: {
      name: 'Sophia Turner',
      avatar: SophiaTurnerAvatar,
      role: 'Author',
    },
    date: 'Nov 29, 2024',
    readTime: '5 Mins Read',
    introduction:
      "There's something magical about islands—the feeling of being surrounded by water, the slower pace of life, and the unique cultures that develop in isolation. From tropical paradises to rugged coastal escapes, here are the most beautiful islands to add to your 2025 travel plans.",
    mainImage: IslandEscapes,
    subtitle:
      'Discover pristine beaches, vibrant marine life, and island cultures that will captivate your heart.',
    content: {
      type: 'countries',
      sections: [
        {
          country: 'Maldives: Overwater Paradise',
          listCountry: [
            'Snorkeling in house reefs',
            'Sunset cruises',
            'Spa treatments over water',
          ],
        },
        {
          country: 'Santorini, Greece: Volcanic Beauty',
          listCountry: [
            'Oia sunset viewing',
            'Wine tasting tours',
            'Ancient Akrotiri ruins',
          ],
        },
        {
          country: 'Palawan, Philippines: Natural Wonder',
          listCountry: [
            'Underground River exploration',
            'Island hopping tours',
            'Kayaking in lagoons',
          ],
        },
      ],
    },
    conclusion:
      'Islands offer a unique escape from the hustle and bustle of daily life. Each island destination provides its own blend of natural beauty, cultural richness, and opportunities for relaxation or adventure. Whether you seek tropical luxury or rugged exploration, these islands promise memories that will last a lifetime.',
  },
  {
    id: '5',
    slug: 'cultural-journeys-rich-heritage-asia',
    title: 'Cultural Journeys: Exploring the Rich Heritage of Asia',
    image: CulturalJourneys,
    author: {
      name: 'Ethan Walker',
      avatar: EthanWalkerAvatar,
      role: 'Author',
    },
    date: 'Nov 29, 2024',
    readTime: '7 Mins Read',
    introduction:
      "Asia is a continent of incredible diversity, where ancient traditions meet modern innovation. From the temple complexes of Southeast Asia to the spiritual sites of South Asia, this journey through Asian heritage will inspire you to explore the rich cultural tapestry of the world's largest continent.",
    mainImage: CulturalJourneys,
    subtitle:
      'Immerse yourself in the traditions, architecture, and spirituality that define Asian cultures.',
    content: {
      type: 'countries',
      sections: [
        {
          country: 'Angkor Wat, Cambodia',
          listCountry: [
            'Temple sunrise viewing',
            'Bayon Temple exploration',
            'Ta Prohm jungle temple',
          ],
        },
        {
          country: 'Kyoto, Japan: Traditional Heart',
          listCountry: [
            'Temple visits (Fushimi Inari, Kinkaku-ji)',
            'Traditional tea ceremony',
            'Geisha district exploration',
          ],
        },
        {
          country: 'Bali, Indonesia: Island of Gods',
          listCountry: [
            'Temple hopping (Besakih, Tanah Lot)',
            'Traditional dance performances',
            'Rice terrace exploration',
          ],
        },
      ],
    },
    conclusion:
      "Asia's cultural heritage is profound and varied, offering travelers endless opportunities to learn, grow, and connect with traditions that have been passed down for thousands of years. Each destination tells a story of resilience, spirituality, and human creativity that continues to inspire visitors from around the world.",
  },
  {
    id: '6',
    slug: 'luxury-budget-affordable-high-end-travel',
    title: 'Luxury on a Budget: Affordable High-End Travel Experiences',
    image: LuxuryBudget,
    author: {
      name: 'Laura Martinez',
      avatar: LauraMartinezAvatar,
      role: 'Author',
    },
    date: 'Nov 29, 2024',
    readTime: '5 Mins Read',
    introduction:
      "Luxury travel doesn't always have to break the bank. With careful planning, insider knowledge, and strategic choices, you can experience high-end travel experiences without the high-end price tag. Here's how to indulge in luxury while staying within your budget.",
    mainImage: LuxuryBudget,
    subtitle:
      'Discover secrets to enjoying premium travel experiences at fraction of the cost.',
    content: {
      type: 'countries',
      sections: [
        {
          country: 'Smart Accommodation Choices',
          listCountry: [
            'Boutique hotels over big chains',
            'Off-season travel for better rates',
            'Loyalty programs and points',
          ],
        },
        {
          country: 'Dining Like Royalty',
          listCountry: [
            'Lunch instead of dinner at fine restaurants',
            'Local markets and street food',
            'Hotel breakfast buffets',
          ],
        },
        {
          country: 'Transportation Hacks',
          listCountry: [
            'Public transportation with first-class upgrades',
            'Off-peak travel times',
            'Rideshare pooling',
          ],
        },
      ],
    },
    conclusion:
      'Luxury travel is accessible when you know the right strategies. By being flexible with timing, leveraging loyalty programs, and making smart choices about where to splurge and where to save, you can enjoy premium experiences that create lasting memories without draining your savings. Travel smart, travel well!',
  },
];
