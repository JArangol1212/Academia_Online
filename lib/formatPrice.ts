export const formatPrice = (price:string | null ):string => {

      if(price === "Gratis") {
            return "Gratis"
      } 

      const priceNumber = price ? parseFloat(price.replace(",", ".")):0


      return new Intl.NumberFormat("en-ES", {
  style: "currency",
  currency: "USD",
    currencyDisplay: "narrowSymbol",
}).format(priceNumber);

}