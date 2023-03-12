export async function conversor(user) {
  try {
    // eslint-disable-next-line no-inner-declarations
    function siglaMoeda(pais: string): string {
      const moedas = {
        "Brazil": "BRL",
        "Estados Unidos": "USD",
        "EUROPA": "EUR",
        "JAPÃO": "JPY"
      };

      return moedas[pais];
    }

    if (user.dataValues.originCurrency === "Estados Unidos" || user.dataValues.destinationCurrency === "Estados Unidos") {
      const destination = user.dataValues.destinationCurrency;
      const origin = user.dataValues.originCurrency;

      const siglaOrigin = siglaMoeda(origin);
      const siglaDestination = siglaMoeda(destination);
      const url = `https://economia.awesomeapi.com.br/${siglaOrigin}-${siglaDestination}/1`;

      const response = await fetch(url);

      const data = await response.json();

      const x = user.dataValues.originValue * data[0].high;
      const newArray = user.dataValues;

      newArray["destinationValue"] = x;
      newArray["idTransiction"] = 12;

      return { newArray };
    }
    const pais = user.dataValues.originCurrency;
    const sigla = siglaMoeda(pais);

    return { sigla };
  } catch (err) {
    console.log("error no converosor");
  }
}
