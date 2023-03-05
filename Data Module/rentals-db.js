// rentals-db.js

// Define the array of rental objects
const rentals = [
  {
    headline: "Cozy Lakefront Log Cabin",
    numSleeps: 2,
    numBedrooms: 1,
    numBathrooms: 1,
    pricePerNight: 125.99,
    city: "Scugog",
    province: "Ontario",
    imageUrl: "rental1.jpg",
    featuredRental: true,
  },
  {
    headline: "Lakeview Cottage in Scugog",
    numSleeps: 4,
    numBedrooms: 2,
    numBathrooms: 1,
    pricePerNight: 99.99,
    city: "Scugog",
    province: "Ontario",
    imageUrl: "rental2.jpg",
    featuredRental: false,
  },
  {
    headline: "Modern Downtown Condo",
    numSleeps: 2,
    numBedrooms: 1,
    numBathrooms: 1,
    pricePerNight: 150.0,
    city: "Toronto",
    province: "Ontario",
    imageUrl: "rental3.jpg",
    featuredRental: false,
  },
  {
    headline: "Luxury Penthouse with Lake Views",
    numSleeps: 6,
    numBedrooms: 3,
    numBathrooms: 2,
    pricePerNight: 299.99,
    city: "Toronto",
    province: "Ontario",
    imageUrl: "rental4.jpg",
    featuredRental: true,
  },
  {
    headline: "Private Retreat in Muskoka",
    numSleeps: 8,
    numBedrooms: 4,
    numBathrooms: 2,
    pricePerNight: 249.99,
    city: "Bracebridge",
    province: "Ontario",
    imageUrl: "rental5.jpg",
    featuredRental: false,
  },
  {
    headline: "Secluded Cottage on Georgian Bay",
    numSleeps: 4,
    numBedrooms: 2,
    numBathrooms: 1,
    pricePerNight: 199.0,
    city: "Parry Sound",
    province: "Ontario",
    imageUrl: "rental6.jpg",
    featuredRental: false,
  },
];

// Define a function to return the featured rentals
function getFeaturedRentals() {
  return rentals.filter((rental) => rental.featuredRental);
}

// Define a function to group the rentals by city and province
function getRentalsByCityAndProvince() {
  const cities = {};

  rentals.forEach((rental) => {
    const cityProvince = `${rental.city}, ${rental.province}`;
    if (!cities[cityProvince]) {
      cities[cityProvince] = [];
    }
    cities[cityProvince].push(rental);
  });

  const result = Object.keys(cities).map((cityProvince) => {
    return {
      cityProvince,
      rentals: cities[cityProvince],
    };
  });

  return result;
}

export { getFeaturedRentals, getRentalsByCityAndProvince };