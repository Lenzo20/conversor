import { Historic } from "../model/HIstoric";

export async function saveHistoric(value: string): Promise<object> {
  try {
    const historic = await Historic.create({
      id: value.id,
      idUser: value.idUser,
      idTransiction: value.idTransiction,
      originCurrency: value.originCurrency,
      originValue: value.originValue,
      destinationCurrency: value.destinationCurrency,
      destinationValue: value.destinationValue,
      conversionRate: value.conversionRate,
    });

    return { historic };
  } catch (err) {
    const error = { error: "erro ao criar historic" };
    return { error };
  }
}
