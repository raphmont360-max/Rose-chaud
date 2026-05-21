import type { TestimonialRatings } from "@/lib/testimonial-ratings";
import { averageRating } from "@/lib/testimonial-ratings";

export type Testimonial = {
  couple: string;
  date: string;
  place: string;
  quote: string;
  short: string;
  ratings: TestimonialRatings;
  rating: number;
};

function t(
  data: Omit<Testimonial, "rating"> & { rating?: number }
): Testimonial {
  const ratings = data.ratings;
  return {
    ...data,
    ratings,
    rating: data.rating ?? averageRating(ratings),
  };
}

export const initialTestimonials: Testimonial[] = [
  t({
    couple: "Camille & Antoine",
    date: "Juin 2024",
    place: "Domaine de Roussas",
    short: "Magique, simplement magique.",
    quote:
      "On cherchait LE groupe qui ferait pleurer nos mamans pendant la cérémonie ET danser nos amis jusqu'à 4 h du matin. Rose chaud a fait les deux. Leur version acoustique de notre chanson nous a bouleversés.",
    ratings: {
      musicalQuality: 5,
      reliability: 5,
      ambiance: 5,
      valueForMoney: 5,
    },
  }),
  t({
    couple: "Léa & Mathieu",
    date: "Septembre 2024",
    place: "Château de Vaux",
    short: "Six musiciens incroyables.",
    quote:
      "Une écoute impeccable et un répertoire qui a réuni nos grands-parents et nos cousins de 20 ans sur la piste. Le moment du « Voyage voyage » restera gravé.",
    ratings: {
      musicalQuality: 5,
      reliability: 5,
      ambiance: 5,
      valueForMoney: 4.8,
    },
  }),
  t({
    couple: "Sarah & Jules",
    date: "Mai 2024",
    place: "Mas Provençal · Luberon",
    short: "Du premier mail à la dernière note.",
    quote:
      "Tout a été d'une fluidité parfaite. Ils ont appris notre titre coup de cœur pour l'ouverture de bal. Magique.",
    ratings: {
      musicalQuality: 5,
      reliability: 5,
      ambiance: 5,
      valueForMoney: 5,
    },
  }),
  t({
    couple: "Marie & Thomas",
    date: "Août 2024",
    place: "Villa Côte d'Azur",
    short: "Une bande de potes hyper talentueux.",
    quote:
      "Rose chaud, ce n'est pas un groupe — c'est une bande de potes qui transforme votre fête en souvenir collectif. Tous nos invités nous demandent encore leurs coordonnées !",
    ratings: {
      musicalQuality: 5,
      reliability: 5,
      ambiance: 5,
      valueForMoney: 5,
    },
  }),
  t({
    couple: "Anaïs & Pierre",
    date: "Juillet 2024",
    place: "Bastide en Provence",
    short: "Une élégance rare.",
    quote:
      "Le set jazz du vin d'honneur a donné le ton de toute la soirée. Leur reprise de « La vie en rose » a fait sangloter ma grand-mère (dans le bon sens !).",
    ratings: {
      musicalQuality: 5,
      reliability: 5,
      ambiance: 5,
      valueForMoney: 4.8,
    },
  }),
  t({
    couple: "Inès & Hugo",
    date: "Octobre 2024",
    place: "Manoir en Bretagne",
    short: "Le meilleur investissement.",
    quote:
      "Professionnels, chaleureux, et un son ENORME. La piste de danse n'a pas désempli. Le meilleur investissement de notre mariage, sans hésiter.",
    ratings: {
      musicalQuality: 5,
      reliability: 5,
      ambiance: 5,
      valueForMoney: 5,
    },
  }),
];
