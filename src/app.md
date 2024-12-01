  const [Currency, setCurrency] = useState(0)
  const [buy, setBuy] = useState([])
  const [exchange, setExchange] = useState([])
  const [sell, setSell] = useState([]);

  const getPercentageValue = (numStr, percentage) => {
    const num = parseFloat(numStr)

    return num * (percentage / 100)
  }

  const getPurchaseRate = (exchangeRate, percentage) => {
    return parseFloat(exchangeRate) + percentage;
  }

  const getSellRate = (exchangeRate, percentage) => {
    return parseFloat(exchangeRate) - percentage;
  }

  const formatApiData = (dataApi) => {
    const result = {
      curr: {
        title: "Currency",
        values: [],
      },
      purchaseRate: {
        title: 'We Buy',
        values: [],
      },
      exchangeRate: {

      },
      sellRate: {

      }
    }

    for (const key in dataApi.rates) {
      result.curr.values.push(key)
      result.exchangeRate.values.push(dataApi.rates[key])

      const percentage = getPercentageValue(dataApi.rates[key], 5)

      const purchaseRate = getPurchaseRate(dataApi.rates[key], percentage)
      const sellRate = getSellRate(dataApi.rates[key], percentage)

      result.purchaseRate.values.push(purchaseRate)
      result.sellRate.values.push(sellRate)
    }

  }

  const API_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=9c91e2e5b07c4b82ae2790c2e9c00369';
  const fetchCurrencyData = async () => {
    try {
      const res = await fetch(API_URL)

      if (!res.ok) {
        const respJson = await res.json()
        throw new Error(respJson)
      }
      const result = await res.json()


      formatApiData(result)

    } catch (error) {
      console.error(error)

    }
  };