export type ArgusPair = "XAUUSD" | "GBPUSD" | "EURUSD";
export type ArgusTimeframe = "15m" | "5m";
export type ArgusPeriod = "full" | "ytd";
export type ArgusDirection = "buy" | "sell";
export type ArgusOutcome = "win" | "loss" | "open";

export type ArgusBacktestTrade = {
  outcome: ArgusOutcome;
  signal: {
    time: number;
    direction: ArgusDirection;
    entry: number;
    stopLoss: number;
    takeProfit: number;
    reasons: readonly string[];
  };
};

export const ARGUS_PAIRS = ["XAUUSD", "GBPUSD", "EURUSD"] as const;
export const ARGUS_TIMEFRAMES = ["15m", "5m"] as const;

export const ARGUS_BACKTEST_DATA = {
  "pairs": {
    "XAUUSD": {
      "15m": [
        {
          "outcome": "loss",
          "signal": {
            "time": 1662036300000,
            "direction": "sell",
            "entry": 1695.278,
            "stopLoss": 1704.318,
            "takeProfit": 1677.198,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1662651000000,
            "direction": "sell",
            "entry": 1707.584,
            "stopLoss": 1716.558,
            "takeProfit": 1689.6360000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at monthly low (1709.514)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663246800000,
            "direction": "sell",
            "entry": 1687.1480000000001,
            "stopLoss": 1687.808,
            "takeProfit": 1685.8280000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1663679700000,
            "direction": "sell",
            "entry": 1666.038,
            "stopLoss": 1670.675,
            "takeProfit": 1656.7640000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663940700000,
            "direction": "sell",
            "entry": 1647.325,
            "stopLoss": 1658.29,
            "takeProfit": 1625.3950000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1665754200000,
            "direction": "sell",
            "entry": 1654.218,
            "stopLoss": 1660.756,
            "takeProfit": 1641.142,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1666103400000,
            "direction": "sell",
            "entry": 1649.317,
            "stopLoss": 1657.728,
            "takeProfit": 1632.495,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1666191600000,
            "direction": "sell",
            "entry": 1633.438,
            "stopLoss": 1637.848,
            "takeProfit": 1624.6180000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1666966500000,
            "direction": "sell",
            "entry": 1644.528,
            "stopLoss": 1653.427,
            "takeProfit": 1626.7300000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1667481300000,
            "direction": "sell",
            "entry": 1619.798,
            "stopLoss": 1625.488,
            "takeProfit": 1608.418,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA",
              "at monthly low (1617.067)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1673275500000,
            "direction": "buy",
            "entry": 1877.2549999999999,
            "stopLoss": 1872.165,
            "takeProfit": 1887.4349999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1673531100000,
            "direction": "buy",
            "entry": 1892.185,
            "stopLoss": 1884.148,
            "takeProfit": 1908.259,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1673621100000,
            "direction": "buy",
            "entry": 1907.298,
            "stopLoss": 1893.115,
            "takeProfit": 1935.664,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1675260900000,
            "direction": "buy",
            "entry": 1930.258,
            "stopLoss": 1926.225,
            "takeProfit": 1938.3240000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1678976100000,
            "direction": "buy",
            "entry": 1928.805,
            "stopLoss": 1923.704,
            "takeProfit": 1939.0070000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1679063400000,
            "direction": "buy",
            "entry": 1955.048,
            "stopLoss": 1943.785,
            "takeProfit": 1977.5739999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1959.625)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1679669100000,
            "direction": "buy",
            "entry": 1997.385,
            "stopLoss": 1985.265,
            "takeProfit": 2021.6249999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1680529500000,
            "direction": "buy",
            "entry": 1980.144,
            "stopLoss": 1962.448,
            "takeProfit": 2015.5359999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1680622200000,
            "direction": "buy",
            "entry": 2018.155,
            "stopLoss": 1977.915,
            "takeProfit": 2098.635,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2009.695)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682000100000,
            "direction": "buy",
            "entry": 2010.665,
            "stopLoss": 2002.375,
            "takeProfit": 2027.245,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2009.695)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682005500000,
            "direction": "buy",
            "entry": 2003.945,
            "stopLoss": 1998.314,
            "takeProfit": 2015.2069999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly high (2009.695)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682518500000,
            "direction": "buy",
            "entry": 2001.2849999999999,
            "stopLoss": 1993.168,
            "takeProfit": 2017.5189999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1683121500000,
            "direction": "buy",
            "entry": 2018.0639999999999,
            "stopLoss": 2006.914,
            "takeProfit": 2040.3639999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1683216000000,
            "direction": "buy",
            "entry": 2051.145,
            "stopLoss": 2042.785,
            "takeProfit": 2067.865,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2048.538)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1683723600000,
            "direction": "buy",
            "entry": 2045.834,
            "stopLoss": 2024.465,
            "takeProfit": 2088.572,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2048.538)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1696255200000,
            "direction": "sell",
            "entry": 1833.414,
            "stopLoss": 1838.865,
            "takeProfit": 1822.512,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1698930900000,
            "direction": "buy",
            "entry": 1990.055,
            "stopLoss": 1986.275,
            "takeProfit": 1997.615,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly high (1987.385)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1700577900000,
            "direction": "buy",
            "entry": 2004.655,
            "stopLoss": 1986.065,
            "takeProfit": 2041.8349999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2009.395)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1702565100000,
            "direction": "buy",
            "entry": 2047.965,
            "stopLoss": 2026.945,
            "takeProfit": 2090.005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2051.865)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703003400000,
            "direction": "buy",
            "entry": 2046.055,
            "stopLoss": 2038.455,
            "takeProfit": 2061.255,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2051.865)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1703176200000,
            "direction": "buy",
            "entry": 2044.7649999999999,
            "stopLoss": 2036.075,
            "takeProfit": 2062.1449999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2051.865)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703252700000,
            "direction": "buy",
            "entry": 2063.315,
            "stopLoss": 2046.515,
            "takeProfit": 2096.915,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1704471300000,
            "direction": "buy",
            "entry": 2055.9350000000004,
            "stopLoss": 2023.755,
            "takeProfit": 2120.295000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (2059.035)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1707319800000,
            "direction": "buy",
            "entry": 2039.175,
            "stopLoss": 2032.075,
            "takeProfit": 2053.375,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (2040.29)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708528500000,
            "direction": "buy",
            "entry": 2029.7949999999998,
            "stopLoss": 2027.075,
            "takeProfit": 2035.2349999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1708706700000,
            "direction": "buy",
            "entry": 2037.5049999999999,
            "stopLoss": 2023.565,
            "takeProfit": 2065.3849999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly 50% (2040.29)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709658000000,
            "direction": "buy",
            "entry": 2128.525,
            "stopLoss": 2123.115,
            "takeProfit": 2139.3450000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709738100000,
            "direction": "buy",
            "entry": 2141.5950000000003,
            "stopLoss": 2130.845,
            "takeProfit": 2163.095000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at quarterly high (2145.135)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709830800000,
            "direction": "buy",
            "entry": 2156.395,
            "stopLoss": 2148.675,
            "takeProfit": 2171.8349999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709911800000,
            "direction": "buy",
            "entry": 2170.175,
            "stopLoss": 2163.205,
            "takeProfit": 2184.1150000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1711549800000,
            "direction": "buy",
            "entry": 2192.4350000000004,
            "stopLoss": 2182.935,
            "takeProfit": 2211.4350000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1711633500000,
            "direction": "buy",
            "entry": 2208.5350000000003,
            "stopLoss": 2205.185,
            "takeProfit": 2215.235000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1711637100000,
            "direction": "buy",
            "entry": 2212.068,
            "stopLoss": 2201.594,
            "takeProfit": 2233.0160000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1712155500000,
            "direction": "buy",
            "entry": 2283.9750000000004,
            "stopLoss": 2271.035,
            "takeProfit": 2309.8550000000014,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1712672100000,
            "direction": "buy",
            "entry": 2361.5950000000003,
            "stopLoss": 2345.128,
            "takeProfit": 2394.5290000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1713283200000,
            "direction": "buy",
            "entry": 2386.165,
            "stopLoss": 2362.935,
            "takeProfit": 2432.625,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1713444300000,
            "direction": "buy",
            "entry": 2384.155,
            "stopLoss": 2378.368,
            "takeProfit": 2395.7290000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1713449700000,
            "direction": "buy",
            "entry": 2382.4550000000004,
            "stopLoss": 2374.795,
            "takeProfit": 2397.775000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1713454200000,
            "direction": "buy",
            "entry": 2384.348,
            "stopLoss": 2368.968,
            "takeProfit": 2415.108,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1716296400000,
            "direction": "buy",
            "entry": 2426.425,
            "stopLoss": 2411.558,
            "takeProfit": 2456.1590000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open",
              "at monthly high (2431.385)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1720097100000,
            "direction": "buy",
            "entry": 2358.568,
            "stopLoss": 2355.785,
            "takeProfit": 2364.134000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1720183500000,
            "direction": "buy",
            "entry": 2373.125,
            "stopLoss": 2361.675,
            "takeProfit": 2396.0249999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1720619100000,
            "direction": "buy",
            "entry": 2381.105,
            "stopLoss": 2375.568,
            "takeProfit": 2392.1789999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2387.595)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1720701900000,
            "direction": "buy",
            "entry": 2407.848,
            "stopLoss": 2379.865,
            "takeProfit": 2463.8140000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at monthly high (2387.595)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1721749500000,
            "direction": "buy",
            "entry": 2407.1380000000004,
            "stopLoss": 2401.455,
            "takeProfit": 2418.5040000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1721827800000,
            "direction": "buy",
            "entry": 2417.045,
            "stopLoss": 2409.925,
            "takeProfit": 2431.285,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1722430800000,
            "direction": "buy",
            "entry": 2420.6150000000002,
            "stopLoss": 2416.725,
            "takeProfit": 2428.395000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1722605400000,
            "direction": "buy",
            "entry": 2466.2850000000003,
            "stopLoss": 2455.275,
            "takeProfit": 2488.3050000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1723217400000,
            "direction": "buy",
            "entry": 2429.625,
            "stopLoss": 2424.855,
            "takeProfit": 2439.165,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723466700000,
            "direction": "buy",
            "entry": 2445.145,
            "stopLoss": 2439.045,
            "takeProfit": 2457.345,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly high (2449.985)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723473900000,
            "direction": "buy",
            "entry": 2451.904,
            "stopLoss": 2441.485,
            "takeProfit": 2472.7419999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (2449.985)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1723553100000,
            "direction": "buy",
            "entry": 2471.128,
            "stopLoss": 2458.805,
            "takeProfit": 2495.774000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723813200000,
            "direction": "buy",
            "entry": 2491.8250000000003,
            "stopLoss": 2463.035,
            "takeProfit": 2549.405000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2483.548)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1726759800000,
            "direction": "buy",
            "entry": 2584.818,
            "stopLoss": 2569.125,
            "takeProfit": 2616.2040000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1727354700000,
            "direction": "buy",
            "entry": 2673.7650000000003,
            "stopLoss": 2666.335,
            "takeProfit": 2688.625000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1727366400000,
            "direction": "buy",
            "entry": 2671.514,
            "stopLoss": 2661.808,
            "takeProfit": 2690.9260000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1727788500000,
            "direction": "buy",
            "entry": 2650.215,
            "stopLoss": 2646.285,
            "takeProfit": 2658.0750000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1728391500000,
            "direction": "buy",
            "entry": 2646.7050000000004,
            "stopLoss": 2627.925,
            "takeProfit": 2684.265000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1728651600000,
            "direction": "buy",
            "entry": 2643.255,
            "stopLoss": 2638.065,
            "takeProfit": 2653.635,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1729083600000,
            "direction": "buy",
            "entry": 2681.945,
            "stopLoss": 2675.828,
            "takeProfit": 2694.1790000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2685.405)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1729174500000,
            "direction": "buy",
            "entry": 2690.1180000000004,
            "stopLoss": 2672.414,
            "takeProfit": 2725.5260000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2685.405)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1729601100000,
            "direction": "buy",
            "entry": 2737.925,
            "stopLoss": 2728.938,
            "takeProfit": 2755.8990000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1729773900000,
            "direction": "buy",
            "entry": 2741.0350000000003,
            "stopLoss": 2734.525,
            "takeProfit": 2754.0550000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1730205900000,
            "direction": "buy",
            "entry": 2752.2650000000003,
            "stopLoss": 2745.945,
            "takeProfit": 2764.9050000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1733328900000,
            "direction": "buy",
            "entry": 2654.2450000000003,
            "stopLoss": 2648.074,
            "takeProfit": 2666.587000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (2649.3559999999998)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1733841900000,
            "direction": "buy",
            "entry": 2689.4950000000003,
            "stopLoss": 2671.705,
            "takeProfit": 2725.075000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (2685.405)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736349300000,
            "direction": "buy",
            "entry": 2664.045,
            "stopLoss": 2649.505,
            "takeProfit": 2693.125,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly 50% (2663.3345)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736517600000,
            "direction": "buy",
            "entry": 2682.5480000000002,
            "stopLoss": 2674.078,
            "takeProfit": 2699.4880000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736949600000,
            "direction": "buy",
            "entry": 2693.8650000000002,
            "stopLoss": 2681.525,
            "takeProfit": 2718.5450000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1737382500000,
            "direction": "buy",
            "entry": 2710.545,
            "stopLoss": 2700.998,
            "takeProfit": 2729.639,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1737468000000,
            "direction": "buy",
            "entry": 2726.405,
            "stopLoss": 2715.845,
            "takeProfit": 2747.525000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2726.105)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1738244700000,
            "direction": "buy",
            "entry": 2783.7850000000003,
            "stopLoss": 2775.525,
            "takeProfit": 2800.3050000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at quarterly high (2790.005)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1738591200000,
            "direction": "buy",
            "entry": 2811.175,
            "stopLoss": 2792.265,
            "takeProfit": 2848.995000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2816.935)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1738773900000,
            "direction": "buy",
            "entry": 2871.045,
            "stopLoss": 2857.815,
            "takeProfit": 2897.505,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1741355100000,
            "direction": "buy",
            "entry": 2923.025,
            "stopLoss": 2915.945,
            "takeProfit": 2937.185,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1741785300000,
            "direction": "buy",
            "entry": 2916.848,
            "stopLoss": 2911.435,
            "takeProfit": 2927.674,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1741872600000,
            "direction": "buy",
            "entry": 2945.085,
            "stopLoss": 2941.475,
            "takeProfit": 2952.3050000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1741876200000,
            "direction": "buy",
            "entry": 2953.7450000000003,
            "stopLoss": 2938.238,
            "takeProfit": 2984.7590000000014,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2956.035)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1742221800000,
            "direction": "buy",
            "entry": 2998.0150000000003,
            "stopLoss": 2984.035,
            "takeProfit": 3025.9750000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1742908500000,
            "direction": "buy",
            "entry": 3024.4750000000004,
            "stopLoss": 3013.438,
            "takeProfit": 3046.549000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1742994900000,
            "direction": "buy",
            "entry": 3025.665,
            "stopLoss": 3016.355,
            "takeProfit": 3044.285,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1743084900000,
            "direction": "buy",
            "entry": 3047.4750000000004,
            "stopLoss": 3032.795,
            "takeProfit": 3076.835000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1743168600000,
            "direction": "buy",
            "entry": 3076.775,
            "stopLoss": 3071.745,
            "takeProfit": 3086.8350000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1743170400000,
            "direction": "buy",
            "entry": 3083.215,
            "stopLoss": 3070.095,
            "takeProfit": 3109.455000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1743607800000,
            "direction": "buy",
            "entry": 3124.7250000000004,
            "stopLoss": 3115.925,
            "takeProfit": 3142.3250000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly high (3127.825)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744382700000,
            "direction": "buy",
            "entry": 3230.505,
            "stopLoss": 3218.805,
            "takeProfit": 3253.9050000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744810200000,
            "direction": "buy",
            "entry": 3305.025,
            "stopLoss": 3301.735,
            "takeProfit": 3311.605,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1744812000000,
            "direction": "buy",
            "entry": 3311.635,
            "stopLoss": 3301.735,
            "takeProfit": 3331.4350000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1745248500000,
            "direction": "buy",
            "entry": 3411.945,
            "stopLoss": 3404.295,
            "takeProfit": 3427.2450000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1745853300000,
            "direction": "buy",
            "entry": 3329.905,
            "stopLoss": 3286.235,
            "takeProfit": 3417.2450000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1746535500000,
            "direction": "buy",
            "entry": 3389.7850000000003,
            "stopLoss": 3375.815,
            "takeProfit": 3417.725000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748007900000,
            "direction": "buy",
            "entry": 3345.348,
            "stopLoss": 3323.625,
            "takeProfit": 3388.794,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749647700000,
            "direction": "buy",
            "entry": 3341.645,
            "stopLoss": 3326.335,
            "takeProfit": 3372.265,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749820500000,
            "direction": "buy",
            "entry": 3440.898,
            "stopLoss": 3410.895,
            "takeProfit": 3500.9040000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (3437.655)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1752846300000,
            "direction": "buy",
            "entry": 3355.4550000000004,
            "stopLoss": 3347.125,
            "takeProfit": 3372.115000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly 50% (3348.005)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1754312400000,
            "direction": "buy",
            "entry": 3367.915,
            "stopLoss": 3352.155,
            "takeProfit": 3399.4349999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1754576100000,
            "direction": "buy",
            "entry": 3390.348,
            "stopLoss": 3374.255,
            "takeProfit": 3422.5339999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756212300000,
            "direction": "buy",
            "entry": 3378.3450000000003,
            "stopLoss": 3366.545,
            "takeProfit": 3401.9450000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756387800000,
            "direction": "buy",
            "entry": 3404.795,
            "stopLoss": 3393.055,
            "takeProfit": 3428.2750000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756476900000,
            "direction": "buy",
            "entry": 3435.2850000000003,
            "stopLoss": 3406.025,
            "takeProfit": 3493.8050000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (3438.655)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1757512800000,
            "direction": "buy",
            "entry": 3651.415,
            "stopLoss": 3639.508,
            "takeProfit": 3675.2290000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757940300000,
            "direction": "buy",
            "entry": 3644.8250000000003,
            "stopLoss": 3638.248,
            "takeProfit": 3657.9790000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1758634200000,
            "direction": "buy",
            "entry": 3783.578,
            "stopLoss": 3776.735,
            "takeProfit": 3797.2639999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1759153500000,
            "direction": "buy",
            "entry": 3826.335,
            "stopLoss": 3808.585,
            "takeProfit": 3861.835,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1759410000000,
            "direction": "buy",
            "entry": 3884.545,
            "stopLoss": 3879.378,
            "takeProfit": 3894.879,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (3871.505)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1759928400000,
            "direction": "buy",
            "entry": 4040.175,
            "stopLoss": 4031.345,
            "takeProfit": 4057.835000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1759933800000,
            "direction": "buy",
            "entry": 4044.715,
            "stopLoss": 4025.555,
            "takeProfit": 4083.0350000000008,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1760013900000,
            "direction": "buy",
            "entry": 4045.598,
            "stopLoss": 4032.855,
            "takeProfit": 4071.084,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1760537700000,
            "direction": "buy",
            "entry": 4208.245,
            "stopLoss": 4175.279,
            "takeProfit": 4274.176999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1761321600000,
            "direction": "buy",
            "entry": 4130.495,
            "stopLoss": 4111.535,
            "takeProfit": 4168.415,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1762956900000,
            "direction": "buy",
            "entry": 4135.255,
            "stopLoss": 4121.995,
            "takeProfit": 4161.775000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1763560800000,
            "direction": "buy",
            "entry": 4110.795,
            "stopLoss": 4100.115,
            "takeProfit": 4132.155000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly 50% (4100.1965)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1763646300000,
            "direction": "buy",
            "entry": 4080.415,
            "stopLoss": 4050.255,
            "takeProfit": 4140.735,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open",
              "at monthly 50% (4100.1965)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1763995500000,
            "direction": "buy",
            "entry": 4073.6150000000002,
            "stopLoss": 4072.835,
            "takeProfit": 4075.1750000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1763997300000,
            "direction": "buy",
            "entry": 4092.175,
            "stopLoss": 4067.575,
            "takeProfit": 4141.375000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly 50% (4100.1965)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1764943200000,
            "direction": "buy",
            "entry": 4234.665,
            "stopLoss": 4220.785,
            "takeProfit": 4262.425,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (4244.925)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1765464300000,
            "direction": "buy",
            "entry": 4243.995,
            "stopLoss": 4204.535,
            "takeProfit": 4322.915,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (4244.925)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1765987200000,
            "direction": "buy",
            "entry": 4330.415,
            "stopLoss": 4322.225,
            "takeProfit": 4346.794999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1766074500000,
            "direction": "buy",
            "entry": 4362.2390000000005,
            "stopLoss": 4307.785,
            "takeProfit": 4471.147000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1766497500000,
            "direction": "buy",
            "entry": 4489.885,
            "stopLoss": 4482.475,
            "takeProfit": 4504.705,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1767707100000,
            "direction": "buy",
            "entry": 4461.135,
            "stopLoss": 4457.978,
            "takeProfit": 4467.4490000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1767714300000,
            "direction": "buy",
            "entry": 4475.558,
            "stopLoss": 4453.035,
            "takeProfit": 4520.604,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1767967200000,
            "direction": "buy",
            "entry": 4482.478,
            "stopLoss": 4460.205,
            "takeProfit": 4527.024,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1768322700000,
            "direction": "buy",
            "entry": 4608.778,
            "stopLoss": 4599.915,
            "takeProfit": 4626.504000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1768398300000,
            "direction": "buy",
            "entry": 4636.965,
            "stopLoss": 4625.295,
            "takeProfit": 4660.305,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1768833900000,
            "direction": "buy",
            "entry": 4667.3150000000005,
            "stopLoss": 4660.698,
            "takeProfit": 4680.549000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1768924800000,
            "direction": "buy",
            "entry": 4737.515,
            "stopLoss": 4721.528,
            "takeProfit": 4769.4890000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1769093100000,
            "direction": "buy",
            "entry": 4845.7480000000005,
            "stopLoss": 4810.035,
            "takeProfit": 4917.174000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1769439600000,
            "direction": "buy",
            "entry": 5096.198,
            "stopLoss": 5053.875,
            "takeProfit": 5180.844000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1769614200000,
            "direction": "buy",
            "entry": 5269.345,
            "stopLoss": 5248.035,
            "takeProfit": 5311.965000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1769694300000,
            "direction": "buy",
            "entry": 5525.885,
            "stopLoss": 5470.045,
            "takeProfit": 5637.5650000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1770732900000,
            "direction": "buy",
            "entry": 5055.968,
            "stopLoss": 5018.915,
            "takeProfit": 5130.074,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1773147600000,
            "direction": "buy",
            "entry": 5187.135,
            "stopLoss": 5161.725,
            "takeProfit": 5237.955,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1775739600000,
            "direction": "buy",
            "entry": 4745.965,
            "stopLoss": 4734.195,
            "takeProfit": 4769.505000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (4758.575)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1775745000000,
            "direction": "buy",
            "entry": 4765.585,
            "stopLoss": 4734.195,
            "takeProfit": 4828.365000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (4758.575)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1776692700000,
            "direction": "buy",
            "entry": 4822.555,
            "stopLoss": 4798.295,
            "takeProfit": 4871.075000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly 50% (4847.54)"
            ]
          }
        }
      ],
      "5m": [
        {
          "outcome": "win",
          "signal": {
            "time": 1662035700000,
            "direction": "sell",
            "entry": 1699.854,
            "stopLoss": 1704.318,
            "takeProfit": 1690.9260000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1662046500000,
            "direction": "sell",
            "entry": 1692.915,
            "stopLoss": 1700.488,
            "takeProfit": 1677.7689999999998,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1662651900000,
            "direction": "sell",
            "entry": 1705.7740000000001,
            "stopLoss": 1716.558,
            "takeProfit": 1684.2060000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at monthly low (1709.514)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1663245300000,
            "direction": "sell",
            "entry": 1683.864,
            "stopLoss": 1687.808,
            "takeProfit": 1675.976,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1663247700000,
            "direction": "sell",
            "entry": 1685.886,
            "stopLoss": 1687.808,
            "takeProfit": 1682.042,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663252200000,
            "direction": "sell",
            "entry": 1683.844,
            "stopLoss": 1692.748,
            "takeProfit": 1666.036,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1663678200000,
            "direction": "sell",
            "entry": 1666.9080000000001,
            "stopLoss": 1670.675,
            "takeProfit": 1659.3740000000005,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1663936500000,
            "direction": "sell",
            "entry": 1644.328,
            "stopLoss": 1674.558,
            "takeProfit": 1583.868,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1665760200000,
            "direction": "sell",
            "entry": 1648.518,
            "stopLoss": 1664.358,
            "takeProfit": 1616.8380000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1666106400000,
            "direction": "sell",
            "entry": 1648.368,
            "stopLoss": 1657.728,
            "takeProfit": 1629.6479999999997,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1666703100000,
            "direction": "sell",
            "entry": 1642.137,
            "stopLoss": 1645.428,
            "takeProfit": 1635.5549999999996,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1666960800000,
            "direction": "sell",
            "entry": 1644.6480000000001,
            "stopLoss": 1653.377,
            "takeProfit": 1627.1900000000005,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1667479500000,
            "direction": "sell",
            "entry": 1620.008,
            "stopLoss": 1624.748,
            "takeProfit": 1610.528,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA",
              "at monthly low (1617.067)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1672755000000,
            "direction": "buy",
            "entry": 1838.325,
            "stopLoss": 1830.255,
            "takeProfit": 1854.465,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1833.215)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1673023200000,
            "direction": "buy",
            "entry": 1861.9279999999999,
            "stopLoss": 1840.075,
            "takeProfit": 1905.6339999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1673626200000,
            "direction": "buy",
            "entry": 1912.248,
            "stopLoss": 1893.115,
            "takeProfit": 1950.5140000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1678970100000,
            "direction": "buy",
            "entry": 1927.925,
            "stopLoss": 1918.038,
            "takeProfit": 1947.6989999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1679063400000,
            "direction": "buy",
            "entry": 1955.048,
            "stopLoss": 1943.785,
            "takeProfit": 1977.5739999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1959.625)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1679584500000,
            "direction": "buy",
            "entry": 1982.375,
            "stopLoss": 1965.955,
            "takeProfit": 2015.2150000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1680186000000,
            "direction": "buy",
            "entry": 1968.905,
            "stopLoss": 1967.105,
            "takeProfit": 1972.5049999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1959.625)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1680266100000,
            "direction": "buy",
            "entry": 1986.258,
            "stopLoss": 1976.365,
            "takeProfit": 2006.044,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1680268800000,
            "direction": "buy",
            "entry": 1981.4579999999999,
            "stopLoss": 1975.625,
            "takeProfit": 1993.1239999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1680526200000,
            "direction": "buy",
            "entry": 1978.105,
            "stopLoss": 1962.448,
            "takeProfit": 2009.4189999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1680617700000,
            "direction": "buy",
            "entry": 2016.598,
            "stopLoss": 1977.915,
            "takeProfit": 2093.964,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2009.695)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1681997700000,
            "direction": "buy",
            "entry": 2006.298,
            "stopLoss": 1996.784,
            "takeProfit": 2025.3259999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (2009.695)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682519100000,
            "direction": "buy",
            "entry": 2001.945,
            "stopLoss": 1993.168,
            "takeProfit": 2019.499,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1683120900000,
            "direction": "buy",
            "entry": 2018.385,
            "stopLoss": 2006.914,
            "takeProfit": 2041.327,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1683642600000,
            "direction": "buy",
            "entry": 2027.3239999999998,
            "stopLoss": 2022.364,
            "takeProfit": 2037.2439999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1696250700000,
            "direction": "sell",
            "entry": 1835.155,
            "stopLoss": 1836.725,
            "takeProfit": 1832.015,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1696253400000,
            "direction": "sell",
            "entry": 1834.935,
            "stopLoss": 1841.028,
            "takeProfit": 1822.7489999999998,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1696597800000,
            "direction": "sell",
            "entry": 1817.4750000000001,
            "stopLoss": 1825.525,
            "takeProfit": 1801.3750000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1698929400000,
            "direction": "buy",
            "entry": 1990.655,
            "stopLoss": 1986.855,
            "takeProfit": 1998.2549999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (1987.385)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1700578500000,
            "direction": "buy",
            "entry": 2006.675,
            "stopLoss": 1986.065,
            "takeProfit": 2047.8949999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2009.395)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1702564500000,
            "direction": "buy",
            "entry": 2043.735,
            "stopLoss": 2026.945,
            "takeProfit": 2077.3149999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2051.865)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1702993800000,
            "direction": "buy",
            "entry": 2030.075,
            "stopLoss": 2025.615,
            "takeProfit": 2038.9950000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703002800000,
            "direction": "buy",
            "entry": 2046.245,
            "stopLoss": 2038.455,
            "takeProfit": 2061.825,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2051.865)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1703165700000,
            "direction": "buy",
            "entry": 2040.398,
            "stopLoss": 2032.655,
            "takeProfit": 2055.884,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703252700000,
            "direction": "buy",
            "entry": 2063.315,
            "stopLoss": 2046.515,
            "takeProfit": 2096.915,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1705337400000,
            "direction": "buy",
            "entry": 2055.0350000000003,
            "stopLoss": 2048.79,
            "takeProfit": 2067.525000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly 50% (2059.035)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1706622300000,
            "direction": "buy",
            "entry": 2036.825,
            "stopLoss": 2030.798,
            "takeProfit": 2048.879,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1706713800000,
            "direction": "buy",
            "entry": 2054.228,
            "stopLoss": 2035.455,
            "takeProfit": 2091.7740000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly 50% (2059.035)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1707316800000,
            "direction": "buy",
            "entry": 2036.905,
            "stopLoss": 2030.005,
            "takeProfit": 2050.705,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open",
              "at monthly 50% (2040.29)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708522800000,
            "direction": "buy",
            "entry": 2030.095,
            "stopLoss": 2026.795,
            "takeProfit": 2036.695,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708529100000,
            "direction": "buy",
            "entry": 2029.725,
            "stopLoss": 2027.075,
            "takeProfit": 2035.0249999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1708706100000,
            "direction": "buy",
            "entry": 2036.995,
            "stopLoss": 2023.565,
            "takeProfit": 2063.8549999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly 50% (2040.29)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709308200000,
            "direction": "buy",
            "entry": 2068.848,
            "stopLoss": 2044.995,
            "takeProfit": 2116.554,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2065.348)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1709653500000,
            "direction": "buy",
            "entry": 2132.045,
            "stopLoss": 2124.445,
            "takeProfit": 2147.245,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709735700000,
            "direction": "buy",
            "entry": 2144.478,
            "stopLoss": 2130.845,
            "takeProfit": 2171.7440000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (2145.135)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1709912100000,
            "direction": "buy",
            "entry": 2173.925,
            "stopLoss": 2163.205,
            "takeProfit": 2195.3650000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1711630800000,
            "direction": "buy",
            "entry": 2215.905,
            "stopLoss": 2206.585,
            "takeProfit": 2234.5450000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1711636800000,
            "direction": "buy",
            "entry": 2210.4350000000004,
            "stopLoss": 2201.594,
            "takeProfit": 2228.117000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1712155500000,
            "direction": "buy",
            "entry": 2283.9750000000004,
            "stopLoss": 2271.035,
            "takeProfit": 2309.8550000000014,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1712323200000,
            "direction": "buy",
            "entry": 2298.558,
            "stopLoss": 2279.735,
            "takeProfit": 2336.2039999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1712668500000,
            "direction": "buy",
            "entry": 2352.8450000000003,
            "stopLoss": 2345.128,
            "takeProfit": 2368.2790000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1712928900000,
            "direction": "buy",
            "entry": 2398.505,
            "stopLoss": 2391.605,
            "takeProfit": 2412.3050000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1713279900000,
            "direction": "buy",
            "entry": 2388.9350000000004,
            "stopLoss": 2362.935,
            "takeProfit": 2440.9350000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1713444300000,
            "direction": "buy",
            "entry": 2384.155,
            "stopLoss": 2378.368,
            "takeProfit": 2395.7290000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1713455400000,
            "direction": "buy",
            "entry": 2382.2250000000004,
            "stopLoss": 2368.968,
            "takeProfit": 2408.7390000000014,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1713541500000,
            "direction": "buy",
            "entry": 2390.905,
            "stopLoss": 2372.505,
            "takeProfit": 2427.7050000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1714135200000,
            "direction": "buy",
            "entry": 2351.608,
            "stopLoss": 2345.105,
            "takeProfit": 2364.6140000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1714136700000,
            "direction": "buy",
            "entry": 2350.3050000000003,
            "stopLoss": 2345.105,
            "takeProfit": 2360.705000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1714140300000,
            "direction": "buy",
            "entry": 2344.6150000000002,
            "stopLoss": 2339.885,
            "takeProfit": 2354.0750000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1714404300000,
            "direction": "buy",
            "entry": 2336.635,
            "stopLoss": 2324.955,
            "takeProfit": 2359.995000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1715347500000,
            "direction": "buy",
            "entry": 2370.675,
            "stopLoss": 2369.285,
            "takeProfit": 2373.455000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1715350500000,
            "direction": "buy",
            "entry": 2367.925,
            "stopLoss": 2359.565,
            "takeProfit": 2384.6450000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1715699100000,
            "direction": "buy",
            "entry": 2352.1850000000004,
            "stopLoss": 2344.324,
            "takeProfit": 2367.907000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1715949900000,
            "direction": "buy",
            "entry": 2390.485,
            "stopLoss": 2381.075,
            "takeProfit": 2409.3050000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1715960400000,
            "direction": "buy",
            "entry": 2408.708,
            "stopLoss": 2386.255,
            "takeProfit": 2453.614,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1719578100000,
            "direction": "buy",
            "entry": 2337.105,
            "stopLoss": 2326.635,
            "takeProfit": 2358.0449999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1720020300000,
            "direction": "buy",
            "entry": 2362.165,
            "stopLoss": 2346.938,
            "takeProfit": 2392.6189999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1720615200000,
            "direction": "buy",
            "entry": 2381.818,
            "stopLoss": 2371.145,
            "takeProfit": 2403.1640000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2387.595)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1720701300000,
            "direction": "buy",
            "entry": 2399.795,
            "stopLoss": 2379.865,
            "takeProfit": 2439.6550000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (2387.595)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1721136600000,
            "direction": "buy",
            "entry": 2438.3050000000003,
            "stopLoss": 2437.544,
            "takeProfit": 2439.827000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1721137200000,
            "direction": "buy",
            "entry": 2442.8250000000003,
            "stopLoss": 2428.785,
            "takeProfit": 2470.905000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at quarterly high (2449.985)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1721749200000,
            "direction": "buy",
            "entry": 2406.335,
            "stopLoss": 2398.925,
            "takeProfit": 2421.1549999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1721828100000,
            "direction": "buy",
            "entry": 2419.195,
            "stopLoss": 2409.925,
            "takeProfit": 2437.735,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1722429300000,
            "direction": "buy",
            "entry": 2421.795,
            "stopLoss": 2417.015,
            "takeProfit": 2431.3550000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1722602100000,
            "direction": "buy",
            "entry": 2473.655,
            "stopLoss": 2460.245,
            "takeProfit": 2500.475000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1722605100000,
            "direction": "buy",
            "entry": 2465.0950000000003,
            "stopLoss": 2455.275,
            "takeProfit": 2484.7350000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723216200000,
            "direction": "buy",
            "entry": 2429.665,
            "stopLoss": 2420.465,
            "takeProfit": 2448.0649999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1723470900000,
            "direction": "buy",
            "entry": 2456.775,
            "stopLoss": 2441.485,
            "takeProfit": 2487.355,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (2449.985)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723811700000,
            "direction": "buy",
            "entry": 2476.4750000000004,
            "stopLoss": 2463.035,
            "takeProfit": 2503.3550000000014,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2483.548)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1724157900000,
            "direction": "buy",
            "entry": 2525.8650000000002,
            "stopLoss": 2520.178,
            "takeProfit": 2537.239000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1724163300000,
            "direction": "buy",
            "entry": 2527.9640000000004,
            "stopLoss": 2521.068,
            "takeProfit": 2541.7560000000008,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1724417400000,
            "direction": "buy",
            "entry": 2501.485,
            "stopLoss": 2495.015,
            "takeProfit": 2514.4250000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1724421900000,
            "direction": "buy",
            "entry": 2510.9480000000003,
            "stopLoss": 2497.775,
            "takeProfit": 2537.294000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1724946300000,
            "direction": "buy",
            "entry": 2522.2450000000003,
            "stopLoss": 2503.015,
            "takeProfit": 2560.7050000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1725542400000,
            "direction": "buy",
            "entry": 2517.585,
            "stopLoss": 2513.035,
            "takeProfit": 2526.6850000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1725546000000,
            "direction": "buy",
            "entry": 2519.835,
            "stopLoss": 2511.825,
            "takeProfit": 2535.8550000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1725627000000,
            "direction": "buy",
            "entry": 2525.775,
            "stopLoss": 2516.595,
            "takeProfit": 2544.1350000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2531.558)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1726144800000,
            "direction": "buy",
            "entry": 2525.985,
            "stopLoss": 2512.405,
            "takeProfit": 2553.145,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2531.558)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1727360400000,
            "direction": "buy",
            "entry": 2668.215,
            "stopLoss": 2666.335,
            "takeProfit": 2671.9750000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1727361300000,
            "direction": "buy",
            "entry": 2667.344,
            "stopLoss": 2654.185,
            "takeProfit": 2693.6620000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1727789100000,
            "direction": "buy",
            "entry": 2652.795,
            "stopLoss": 2646.285,
            "takeProfit": 2665.8150000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1728651900000,
            "direction": "buy",
            "entry": 2646.2450000000003,
            "stopLoss": 2638.065,
            "takeProfit": 2662.605000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1729083000000,
            "direction": "buy",
            "entry": 2681.355,
            "stopLoss": 2672.5,
            "takeProfit": 2699.065,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (2685.405)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1729088400000,
            "direction": "buy",
            "entry": 2680.9350000000004,
            "stopLoss": 2675.828,
            "takeProfit": 2691.1490000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (2685.405)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1729172400000,
            "direction": "buy",
            "entry": 2683.045,
            "stopLoss": 2672.414,
            "takeProfit": 2704.307,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2685.405)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1729515600000,
            "direction": "buy",
            "entry": 2738.775,
            "stopLoss": 2732.125,
            "takeProfit": 2752.0750000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1729600800000,
            "direction": "buy",
            "entry": 2736.315,
            "stopLoss": 2728.938,
            "takeProfit": 2751.069,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1729773600000,
            "direction": "buy",
            "entry": 2739.6850000000004,
            "stopLoss": 2734.525,
            "takeProfit": 2750.005000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1729871100000,
            "direction": "buy",
            "entry": 2738.3250000000003,
            "stopLoss": 2724.615,
            "takeProfit": 2765.7450000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1730127900000,
            "direction": "buy",
            "entry": 2742.645,
            "stopLoss": 2730.748,
            "takeProfit": 2766.439,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1733328600000,
            "direction": "buy",
            "entry": 2654.648,
            "stopLoss": 2648.074,
            "takeProfit": 2667.7960000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (2649.3559999999998)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1733758800000,
            "direction": "buy",
            "entry": 2671.915,
            "stopLoss": 2652.675,
            "takeProfit": 2710.3949999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1733936100000,
            "direction": "buy",
            "entry": 2715.7140000000004,
            "stopLoss": 2710.404,
            "takeProfit": 2726.334000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1736344500000,
            "direction": "buy",
            "entry": 2658.635,
            "stopLoss": 2645.174,
            "takeProfit": 2685.5570000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly 50% (2654.1845000000003)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736520600000,
            "direction": "buy",
            "entry": 2687.784,
            "stopLoss": 2662.705,
            "takeProfit": 2737.9420000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1736948700000,
            "direction": "buy",
            "entry": 2687.005,
            "stopLoss": 2684.138,
            "takeProfit": 2692.7390000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737038400000,
            "direction": "buy",
            "entry": 2715.605,
            "stopLoss": 2699.469,
            "takeProfit": 2747.877,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1737384300000,
            "direction": "buy",
            "entry": 2709.085,
            "stopLoss": 2700.998,
            "takeProfit": 2725.259,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1737467400000,
            "direction": "buy",
            "entry": 2728.815,
            "stopLoss": 2715.845,
            "takeProfit": 2754.7550000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (2726.105)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737557400000,
            "direction": "buy",
            "entry": 2757.0150000000003,
            "stopLoss": 2750.295,
            "takeProfit": 2770.455000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737563700000,
            "direction": "buy",
            "entry": 2757.918,
            "stopLoss": 2749.648,
            "takeProfit": 2774.458,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737726300000,
            "direction": "buy",
            "entry": 2784.295,
            "stopLoss": 2770.268,
            "takeProfit": 2812.349,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (2790.005)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1738244100000,
            "direction": "buy",
            "entry": 2780.1150000000002,
            "stopLoss": 2775.525,
            "takeProfit": 2789.2950000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1738250100000,
            "direction": "buy",
            "entry": 2790.025,
            "stopLoss": 2776.455,
            "takeProfit": 2817.1650000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (2790.005)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1738590900000,
            "direction": "buy",
            "entry": 2810.465,
            "stopLoss": 2792.265,
            "takeProfit": 2846.8650000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (2816.935)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1738774800000,
            "direction": "buy",
            "entry": 2875.0950000000003,
            "stopLoss": 2857.815,
            "takeProfit": 2909.6550000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1739202900000,
            "direction": "buy",
            "entry": 2907.885,
            "stopLoss": 2895.705,
            "takeProfit": 2932.245000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1739893200000,
            "direction": "buy",
            "entry": 2926.755,
            "stopLoss": 2912.615,
            "takeProfit": 2955.0350000000008,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1741190700000,
            "direction": "buy",
            "entry": 2918.8250000000003,
            "stopLoss": 2893.645,
            "takeProfit": 2969.185000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1741354500000,
            "direction": "buy",
            "entry": 2919.5480000000002,
            "stopLoss": 2915.945,
            "takeProfit": 2926.7540000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1741357800000,
            "direction": "buy",
            "entry": 2917.025,
            "stopLoss": 2909.475,
            "takeProfit": 2932.1250000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1741872900000,
            "direction": "buy",
            "entry": 2947.348,
            "stopLoss": 2941.475,
            "takeProfit": 2959.094,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (2956.035)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1742224500000,
            "direction": "buy",
            "entry": 2995.835,
            "stopLoss": 2984.035,
            "takeProfit": 3019.4350000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1742305800000,
            "direction": "buy",
            "entry": 3034.715,
            "stopLoss": 3021.765,
            "takeProfit": 3060.6150000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1742993100000,
            "direction": "buy",
            "entry": 3028.945,
            "stopLoss": 3016.355,
            "takeProfit": 3054.1250000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1743165300000,
            "direction": "buy",
            "entry": 3078.1850000000004,
            "stopLoss": 3066.655,
            "takeProfit": 3101.245000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1743607200000,
            "direction": "buy",
            "entry": 3127.545,
            "stopLoss": 3115.925,
            "takeProfit": 3150.785,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (3127.825)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744380600000,
            "direction": "buy",
            "entry": 3232.405,
            "stopLoss": 3210.345,
            "takeProfit": 3276.525000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1744807500000,
            "direction": "buy",
            "entry": 3312.715,
            "stopLoss": 3292.395,
            "takeProfit": 3353.3550000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1745238900000,
            "direction": "buy",
            "entry": 3403.6850000000004,
            "stopLoss": 3385.595,
            "takeProfit": 3439.8650000000016,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1745855400000,
            "direction": "buy",
            "entry": 3327.295,
            "stopLoss": 3286.235,
            "takeProfit": 3409.415,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1746195300000,
            "direction": "buy",
            "entry": 3252.275,
            "stopLoss": 3238.465,
            "takeProfit": 3279.895,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1746534900000,
            "direction": "buy",
            "entry": 3384.395,
            "stopLoss": 3375.815,
            "takeProfit": 3401.555,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748010000000,
            "direction": "buy",
            "entry": 3352.6980000000003,
            "stopLoss": 3323.625,
            "takeProfit": 3410.844000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749559500000,
            "direction": "buy",
            "entry": 3338.735,
            "stopLoss": 3326.365,
            "takeProfit": 3363.475000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749647400000,
            "direction": "buy",
            "entry": 3341.348,
            "stopLoss": 3326.335,
            "takeProfit": 3371.374,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749737100000,
            "direction": "buy",
            "entry": 3390.635,
            "stopLoss": 3378.395,
            "takeProfit": 3415.1150000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749743400000,
            "direction": "buy",
            "entry": 3388.248,
            "stopLoss": 3378.395,
            "takeProfit": 3407.954,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749818400000,
            "direction": "buy",
            "entry": 3432.248,
            "stopLoss": 3410.895,
            "takeProfit": 3474.954,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (3437.655)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1752853500000,
            "direction": "buy",
            "entry": 3355.395,
            "stopLoss": 3350.495,
            "takeProfit": 3365.195,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly 50% (3348.005)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1753106400000,
            "direction": "buy",
            "entry": 3388.695,
            "stopLoss": 3362.165,
            "takeProfit": 3441.7550000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1754311800000,
            "direction": "buy",
            "entry": 3367.598,
            "stopLoss": 3352.155,
            "takeProfit": 3398.4839999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1754571600000,
            "direction": "buy",
            "entry": 3380.7450000000003,
            "stopLoss": 3374.255,
            "takeProfit": 3393.725000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1754576100000,
            "direction": "buy",
            "entry": 3390.348,
            "stopLoss": 3374.255,
            "takeProfit": 3422.5339999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1756137300000,
            "direction": "buy",
            "entry": 3374.2450000000003,
            "stopLoss": 3361.405,
            "takeProfit": 3399.9250000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756211700000,
            "direction": "buy",
            "entry": 3377.675,
            "stopLoss": 3366.545,
            "takeProfit": 3399.9350000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756384500000,
            "direction": "buy",
            "entry": 3404.2850000000003,
            "stopLoss": 3393.055,
            "takeProfit": 3426.7450000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756476300000,
            "direction": "buy",
            "entry": 3431.6850000000004,
            "stopLoss": 3406.025,
            "takeProfit": 3483.005000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (3438.655)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756731000000,
            "direction": "buy",
            "entry": 3470.3650000000002,
            "stopLoss": 3465.405,
            "takeProfit": 3480.2850000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756737000000,
            "direction": "buy",
            "entry": 3477.8250000000003,
            "stopLoss": 3466.485,
            "takeProfit": 3500.5050000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756822800000,
            "direction": "buy",
            "entry": 3499.675,
            "stopLoss": 3473.635,
            "takeProfit": 3551.755,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly high (3499.915)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1756907100000,
            "direction": "buy",
            "entry": 3551.835,
            "stopLoss": 3540.605,
            "takeProfit": 3574.295,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757338500000,
            "direction": "buy",
            "entry": 3625.655,
            "stopLoss": 3611.898,
            "takeProfit": 3653.1690000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757423100000,
            "direction": "buy",
            "entry": 3652.7980000000002,
            "stopLoss": 3646.125,
            "takeProfit": 3666.1440000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1757511300000,
            "direction": "buy",
            "entry": 3651.715,
            "stopLoss": 3639.508,
            "takeProfit": 3676.129000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757940600000,
            "direction": "buy",
            "entry": 3649.005,
            "stopLoss": 3638.248,
            "takeProfit": 3670.5190000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1758630900000,
            "direction": "buy",
            "entry": 3783.1850000000004,
            "stopLoss": 3778.955,
            "takeProfit": 3791.6450000000013,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1758636000000,
            "direction": "buy",
            "entry": 3783.7980000000002,
            "stopLoss": 3776.735,
            "takeProfit": 3797.9240000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1758640500000,
            "direction": "buy",
            "entry": 3779.1380000000004,
            "stopLoss": 3766.685,
            "takeProfit": 3804.0440000000012,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1758890100000,
            "direction": "buy",
            "entry": 3753.965,
            "stopLoss": 3742.255,
            "takeProfit": 3777.385,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1758900300000,
            "direction": "buy",
            "entry": 3776.125,
            "stopLoss": 3745.635,
            "takeProfit": 3837.1049999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1759331400000,
            "direction": "buy",
            "entry": 3874.7180000000003,
            "stopLoss": 3866.875,
            "takeProfit": 3890.404000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (3871.505)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1759410300000,
            "direction": "buy",
            "entry": 3889.795,
            "stopLoss": 3879.378,
            "takeProfit": 3910.629,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1759504800000,
            "direction": "buy",
            "entry": 3879.7650000000003,
            "stopLoss": 3865.615,
            "takeProfit": 3908.0650000000014,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (3871.505)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1759756200000,
            "direction": "buy",
            "entry": 3935.5750000000003,
            "stopLoss": 3932.005,
            "takeProfit": 3942.7150000000006,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1759758000000,
            "direction": "buy",
            "entry": 3938.385,
            "stopLoss": 3925.945,
            "takeProfit": 3963.2650000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1759845000000,
            "direction": "buy",
            "entry": 3979.545,
            "stopLoss": 3955.685,
            "takeProfit": 4027.2650000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1759928400000,
            "direction": "buy",
            "entry": 4040.175,
            "stopLoss": 4031.345,
            "takeProfit": 4057.835000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1759932000000,
            "direction": "buy",
            "entry": 4038.148,
            "stopLoss": 4030.305,
            "takeProfit": 4053.8340000000007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1760013900000,
            "direction": "buy",
            "entry": 4045.598,
            "stopLoss": 4032.855,
            "takeProfit": 4071.084,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1760368500000,
            "direction": "buy",
            "entry": 4096.915,
            "stopLoss": 4072.465,
            "takeProfit": 4145.815,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1760457600000,
            "direction": "buy",
            "entry": 4137.975,
            "stopLoss": 4125.548,
            "takeProfit": 4162.8290000000015,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1760536200000,
            "direction": "buy",
            "entry": 4193.955,
            "stopLoss": 4175.279,
            "takeProfit": 4231.306999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1760967600000,
            "direction": "buy",
            "entry": 4311.465,
            "stopLoss": 4250.165,
            "takeProfit": 4434.0650000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1761232200000,
            "direction": "buy",
            "entry": 4148.255,
            "stopLoss": 4135.305,
            "takeProfit": 4174.155,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1761319500000,
            "direction": "buy",
            "entry": 4127.518,
            "stopLoss": 4096.975,
            "takeProfit": 4188.603999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1762954500000,
            "direction": "buy",
            "entry": 4131.765,
            "stopLoss": 4122.325,
            "takeProfit": 4150.645000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1763559900000,
            "direction": "buy",
            "entry": 4114.675,
            "stopLoss": 4105.745,
            "takeProfit": 4132.535000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly 50% (4100.1965)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1763563200000,
            "direction": "buy",
            "entry": 4115.195000000001,
            "stopLoss": 4100.115,
            "takeProfit": 4145.355000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (4100.1965)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1763646000000,
            "direction": "buy",
            "entry": 4092.915,
            "stopLoss": 4050.255,
            "takeProfit": 4178.235,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open",
              "at monthly 50% (4100.1965)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1763991900000,
            "direction": "buy",
            "entry": 4077.385,
            "stopLoss": 4064.825,
            "takeProfit": 4102.505000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1764343800000,
            "direction": "buy",
            "entry": 4197.225,
            "stopLoss": 4167.538,
            "takeProfit": 4256.599000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1764866700000,
            "direction": "buy",
            "entry": 4210.995,
            "stopLoss": 4190.715,
            "takeProfit": 4251.554999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1764949200000,
            "direction": "buy",
            "entry": 4257.645,
            "stopLoss": 4227.545,
            "takeProfit": 4317.845000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (4244.925)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1765463700000,
            "direction": "buy",
            "entry": 4235.8550000000005,
            "stopLoss": 4204.535,
            "takeProfit": 4298.495000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (4244.925)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1765806600000,
            "direction": "buy",
            "entry": 4343.975,
            "stopLoss": 4332.755,
            "takeProfit": 4366.415000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1765982400000,
            "direction": "buy",
            "entry": 4333.465,
            "stopLoss": 4314.355,
            "takeProfit": 4371.685000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1766072400000,
            "direction": "buy",
            "entry": 4340.775000000001,
            "stopLoss": 4307.785,
            "takeProfit": 4406.755000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1766417700000,
            "direction": "buy",
            "entry": 4425.075,
            "stopLoss": 4405.405,
            "takeProfit": 4464.415,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1766496900000,
            "direction": "buy",
            "entry": 4491.925,
            "stopLoss": 4482.475,
            "takeProfit": 4510.825,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1767710100000,
            "direction": "buy",
            "entry": 4478.948,
            "stopLoss": 4453.035,
            "takeProfit": 4530.774000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1767970200000,
            "direction": "buy",
            "entry": 4484.7880000000005,
            "stopLoss": 4458.095,
            "takeProfit": 4538.174000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1768323000000,
            "direction": "buy",
            "entry": 4610.965,
            "stopLoss": 4599.915,
            "takeProfit": 4633.0650000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1768398900000,
            "direction": "buy",
            "entry": 4635.665,
            "stopLoss": 4625.295,
            "takeProfit": 4656.405,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1768830000000,
            "direction": "buy",
            "entry": 4670.485000000001,
            "stopLoss": 4658.925,
            "takeProfit": 4693.605000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1768916700000,
            "direction": "buy",
            "entry": 4729.8150000000005,
            "stopLoss": 4720.915,
            "takeProfit": 4747.615000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1768920000000,
            "direction": "buy",
            "entry": 4739.0650000000005,
            "stopLoss": 4714.575,
            "takeProfit": 4788.045000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1769181600000,
            "direction": "buy",
            "entry": 4949.285,
            "stopLoss": 4932.035,
            "takeProfit": 4983.785,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1769442600000,
            "direction": "buy",
            "entry": 5085.675,
            "stopLoss": 5053.875,
            "takeProfit": 5149.275000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1769611200000,
            "direction": "buy",
            "entry": 5282.055,
            "stopLoss": 5251.015,
            "takeProfit": 5344.135,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1769614500000,
            "direction": "buy",
            "entry": 5273.055,
            "stopLoss": 5248.035,
            "takeProfit": 5323.095000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1769697600000,
            "direction": "buy",
            "entry": 5531.848,
            "stopLoss": 5499.125,
            "takeProfit": 5597.294,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1770732600000,
            "direction": "buy",
            "entry": 5055.925,
            "stopLoss": 5018.915,
            "takeProfit": 5129.945000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1770822300000,
            "direction": "buy",
            "entry": 5064.805,
            "stopLoss": 5017.495,
            "takeProfit": 5159.425000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1771863000000,
            "direction": "buy",
            "entry": 5196.825,
            "stopLoss": 5140.725,
            "takeProfit": 5309.024999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1772027100000,
            "direction": "buy",
            "entry": 5187.165,
            "stopLoss": 5176.535,
            "takeProfit": 5208.425,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1772034000000,
            "direction": "buy",
            "entry": 5187.995,
            "stopLoss": 5157.945,
            "takeProfit": 5248.095,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1772125200000,
            "direction": "buy",
            "entry": 5179.695000000001,
            "stopLoss": 5128.995,
            "takeProfit": 5281.095000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1775739600000,
            "direction": "buy",
            "entry": 4745.965,
            "stopLoss": 4722.818,
            "takeProfit": 4792.259,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly 50% (4758.575)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1775750400000,
            "direction": "buy",
            "entry": 4792.8150000000005,
            "stopLoss": 4746.575,
            "takeProfit": 4885.295000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (4758.575)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1776180000000,
            "direction": "buy",
            "entry": 4800.645,
            "stopLoss": 4761.405,
            "takeProfit": 4879.125000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1776440100000,
            "direction": "buy",
            "entry": 4873.885,
            "stopLoss": 4781.545,
            "takeProfit": 5058.5650000000005,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at quarterly 50% (4847.54)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1776688800000,
            "direction": "buy",
            "entry": 4803.905,
            "stopLoss": 4785.815,
            "takeProfit": 4840.085,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        }
      ]
    },
    "GBPUSD": {
      "15m": [
        {
          "outcome": "win",
          "signal": {
            "time": 1662038100000,
            "direction": "sell",
            "entry": 1.1571200000000001,
            "stopLoss": 1.15882,
            "takeProfit": 1.1537200000000005,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at monthly low (1.15988)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1662558300000,
            "direction": "sell",
            "entry": 1.14352,
            "stopLoss": 1.14415,
            "takeProfit": 1.1422600000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663247700000,
            "direction": "sell",
            "entry": 1.1502700000000001,
            "stopLoss": 1.15239,
            "takeProfit": 1.1460300000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1663333200000,
            "direction": "sell",
            "entry": 1.13772,
            "stopLoss": 1.14181,
            "takeProfit": 1.1295400000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663767900000,
            "direction": "sell",
            "entry": 1.13335,
            "stopLoss": 1.13523,
            "takeProfit": 1.1295900000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663859700000,
            "direction": "sell",
            "entry": 1.12572,
            "stopLoss": 1.13028,
            "takeProfit": 1.1166000000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1665149400000,
            "direction": "sell",
            "entry": 1.11393,
            "stopLoss": 1.1218,
            "takeProfit": 1.0981900000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1677769200000,
            "direction": "sell",
            "entry": 1.19371,
            "stopLoss": 1.1992699999999998,
            "takeProfit": 1.1825900000000005,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at monthly low (1.19145)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1688390100000,
            "direction": "buy",
            "entry": 1.26921,
            "stopLoss": 1.26563,
            "takeProfit": 1.2763699999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1688745600000,
            "direction": "buy",
            "entry": 1.2838699999999998,
            "stopLoss": 1.27484,
            "takeProfit": 1.3019299999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.28481)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1690378200000,
            "direction": "buy",
            "entry": 1.2917699999999999,
            "stopLoss": 1.2898500000000002,
            "takeProfit": 1.2956099999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1696256100000,
            "direction": "sell",
            "entry": 1.21211,
            "stopLoss": 1.21721,
            "takeProfit": 1.2019100000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at monthly low (1.21101)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1696855500000,
            "direction": "sell",
            "entry": 1.21673,
            "stopLoss": 1.21861,
            "takeProfit": 1.2129700000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1697204700000,
            "direction": "sell",
            "entry": 1.21621,
            "stopLoss": 1.2205899999999998,
            "takeProfit": 1.2074500000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1698842700000,
            "direction": "sell",
            "entry": 1.2133500000000002,
            "stopLoss": 1.2149699999999999,
            "takeProfit": 1.2101100000000007,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1698847200000,
            "direction": "sell",
            "entry": 1.2106000000000001,
            "stopLoss": 1.21487,
            "takeProfit": 1.2020600000000006,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at quarterly low (1.21101)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1702562400000,
            "direction": "buy",
            "entry": 1.2727899999999999,
            "stopLoss": 1.26557,
            "takeProfit": 1.2872299999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.27329)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1702994400000,
            "direction": "buy",
            "entry": 1.2744099999999998,
            "stopLoss": 1.26921,
            "takeProfit": 1.2848099999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.27329)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703255400000,
            "direction": "buy",
            "entry": 1.2726799999999998,
            "stopLoss": 1.2687300000000001,
            "takeProfit": 1.2805799999999992,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly high (1.27329)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1703685600000,
            "direction": "buy",
            "entry": 1.2755599999999998,
            "stopLoss": 1.27258,
            "takeProfit": 1.2815199999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.27329)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1704901500000,
            "direction": "buy",
            "entry": 1.2735299999999998,
            "stopLoss": 1.2708000000000002,
            "takeProfit": 1.2789899999999992,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1706191200000,
            "direction": "buy",
            "entry": 1.2736999999999998,
            "stopLoss": 1.27172,
            "takeProfit": 1.2776599999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708695900000,
            "direction": "buy",
            "entry": 1.2688,
            "stopLoss": 1.26438,
            "takeProfit": 1.2776399999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (1.269085)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709311500000,
            "direction": "buy",
            "entry": 1.26481,
            "stopLoss": 1.25945,
            "takeProfit": 1.27553,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly 50% (1.26451)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709819100000,
            "direction": "buy",
            "entry": 1.2760399999999998,
            "stopLoss": 1.27437,
            "takeProfit": 1.2793799999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly high (1.27721)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1709905500000,
            "direction": "buy",
            "entry": 1.2883399999999998,
            "stopLoss": 1.2817800000000001,
            "takeProfit": 1.3014599999999992,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at quarterly high (1.28272)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1716304500000,
            "direction": "buy",
            "entry": 1.2722499999999999,
            "stopLoss": 1.26813,
            "takeProfit": 1.2804899999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.2709)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1716554700000,
            "direction": "buy",
            "entry": 1.27223,
            "stopLoss": 1.27084,
            "takeProfit": 1.27501,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly high (1.2709)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1717591500000,
            "direction": "buy",
            "entry": 1.27873,
            "stopLoss": 1.2761500000000001,
            "takeProfit": 1.2838899999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.28005)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1718196300000,
            "direction": "buy",
            "entry": 1.2835299999999998,
            "stopLoss": 1.27498,
            "takeProfit": 1.3006299999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.28005)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1720183500000,
            "direction": "buy",
            "entry": 1.2802499999999999,
            "stopLoss": 1.2777800000000001,
            "takeProfit": 1.2851899999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1720792800000,
            "direction": "buy",
            "entry": 1.2979299999999998,
            "stopLoss": 1.29257,
            "takeProfit": 1.3086499999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1721835000000,
            "direction": "buy",
            "entry": 1.29225,
            "stopLoss": 1.29094,
            "takeProfit": 1.2948699999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723734900000,
            "direction": "buy",
            "entry": 1.2868799999999998,
            "stopLoss": 1.2793400000000001,
            "takeProfit": 1.3019599999999991,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (1.28604)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1724161500000,
            "direction": "buy",
            "entry": 1.30287,
            "stopLoss": 1.2987600000000001,
            "takeProfit": 1.3110899999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.30443)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1724422500000,
            "direction": "buy",
            "entry": 1.31948,
            "stopLoss": 1.3103,
            "takeProfit": 1.33784,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1726759800000,
            "direction": "buy",
            "entry": 1.3272499999999998,
            "stopLoss": 1.32146,
            "takeProfit": 1.3388299999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at monthly high (1.32657)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1727191800000,
            "direction": "buy",
            "entry": 1.3383299999999998,
            "stopLoss": 1.33674,
            "takeProfit": 1.3415099999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1727354700000,
            "direction": "buy",
            "entry": 1.33713,
            "stopLoss": 1.3345200000000002,
            "takeProfit": 1.3423499999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1736437500000,
            "direction": "sell",
            "entry": 1.2295200000000002,
            "stopLoss": 1.23216,
            "takeProfit": 1.2242400000000007,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736862300000,
            "direction": "sell",
            "entry": 1.2154500000000001,
            "stopLoss": 1.2198,
            "takeProfit": 1.2067500000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737039600000,
            "direction": "sell",
            "entry": 1.21961,
            "stopLoss": 1.22053,
            "takeProfit": 1.2177700000000005,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744376400000,
            "direction": "buy",
            "entry": 1.31236,
            "stopLoss": 1.3051000000000001,
            "takeProfit": 1.3268799999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1744730100000,
            "direction": "buy",
            "entry": 1.32367,
            "stopLoss": 1.32002,
            "takeProfit": 1.3309699999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1746622800000,
            "direction": "buy",
            "entry": 1.3367699999999998,
            "stopLoss": 1.33175,
            "takeProfit": 1.3468099999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1747755000000,
            "direction": "buy",
            "entry": 1.33686,
            "stopLoss": 1.33295,
            "takeProfit": 1.3446799999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1747838700000,
            "direction": "buy",
            "entry": 1.34385,
            "stopLoss": 1.33951,
            "takeProfit": 1.35253,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.34438)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748869200000,
            "direction": "buy",
            "entry": 1.35435,
            "stopLoss": 1.3521800000000002,
            "takeProfit": 1.3586899999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749130200000,
            "direction": "buy",
            "entry": 1.36146,
            "stopLoss": 1.35606,
            "takeProfit": 1.3722599999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749732300000,
            "direction": "buy",
            "entry": 1.3619199999999998,
            "stopLoss": 1.35741,
            "takeProfit": 1.3709399999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1750079700000,
            "direction": "buy",
            "entry": 1.3596899999999998,
            "stopLoss": 1.35684,
            "takeProfit": 1.3653899999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1750774500000,
            "direction": "buy",
            "entry": 1.36181,
            "stopLoss": 1.35856,
            "takeProfit": 1.36831,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1755002700000,
            "direction": "buy",
            "entry": 1.35008,
            "stopLoss": 1.3441,
            "takeProfit": 1.3620399999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at monthly 50% (1.34869)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1756216800000,
            "direction": "buy",
            "entry": 1.34812,
            "stopLoss": 1.34654,
            "takeProfit": 1.3512799999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly 50% (1.34869)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1756385100000,
            "direction": "buy",
            "entry": 1.35164,
            "stopLoss": 1.34945,
            "takeProfit": 1.3560199999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1757341800000,
            "direction": "buy",
            "entry": 1.35394,
            "stopLoss": 1.3497000000000001,
            "takeProfit": 1.3624199999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1758036600000,
            "direction": "buy",
            "entry": 1.3648099999999999,
            "stopLoss": 1.362,
            "takeProfit": 1.3704299999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1765808100000,
            "direction": "buy",
            "entry": 1.33869,
            "stopLoss": 1.33802,
            "takeProfit": 1.3400299999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1765814400000,
            "direction": "buy",
            "entry": 1.33957,
            "stopLoss": 1.33759,
            "takeProfit": 1.3435299999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1765895400000,
            "direction": "buy",
            "entry": 1.34334,
            "stopLoss": 1.34056,
            "takeProfit": 1.3489,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1765902600000,
            "direction": "buy",
            "entry": 1.34276,
            "stopLoss": 1.3398700000000001,
            "takeProfit": 1.3485399999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1766072700000,
            "direction": "buy",
            "entry": 1.34004,
            "stopLoss": 1.33429,
            "takeProfit": 1.3515399999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1767026700000,
            "direction": "buy",
            "entry": 1.3496899999999998,
            "stopLoss": 1.34807,
            "takeProfit": 1.3529299999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1767631500000,
            "direction": "buy",
            "entry": 1.3520599999999998,
            "stopLoss": 1.34198,
            "takeProfit": 1.3722199999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.3534)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1769175900000,
            "direction": "buy",
            "entry": 1.3531499999999999,
            "stopLoss": 1.35088,
            "takeProfit": 1.3576899999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.3534)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1770647400000,
            "direction": "buy",
            "entry": 1.36503,
            "stopLoss": 1.35883,
            "takeProfit": 1.37743,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1776263400000,
            "direction": "buy",
            "entry": 1.3577299999999999,
            "stopLoss": 1.35474,
            "takeProfit": 1.3637099999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1776439800000,
            "direction": "buy",
            "entry": 1.3557199999999998,
            "stopLoss": 1.35547,
            "takeProfit": 1.3562199999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1777036500000,
            "direction": "buy",
            "entry": 1.3498599999999998,
            "stopLoss": 1.34551,
            "takeProfit": 1.3585599999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.34831)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1777555800000,
            "direction": "buy",
            "entry": 1.3515,
            "stopLoss": 1.34934,
            "takeProfit": 1.3558199999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at quarterly 50% (1.3513950000000001)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1778161500000,
            "direction": "buy",
            "entry": 1.3629,
            "stopLoss": 1.3613,
            "takeProfit": 1.3661,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly high (1.36119)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1778244300000,
            "direction": "buy",
            "entry": 1.3621899999999998,
            "stopLoss": 1.35952,
            "takeProfit": 1.3675299999999992,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly high (1.36119)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1778505300000,
            "direction": "buy",
            "entry": 1.36218,
            "stopLoss": 1.35945,
            "takeProfit": 1.3676399999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.36119)"
            ]
          }
        }
      ],
      "5m": [
        {
          "outcome": "win",
          "signal": {
            "time": 1662036900000,
            "direction": "sell",
            "entry": 1.15608,
            "stopLoss": 1.15882,
            "takeProfit": 1.1506,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1662123300000,
            "direction": "sell",
            "entry": 1.1536600000000001,
            "stopLoss": 1.15746,
            "takeProfit": 1.1460600000000005,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1662556200000,
            "direction": "sell",
            "entry": 1.14186,
            "stopLoss": 1.14415,
            "takeProfit": 1.1372800000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1662558900000,
            "direction": "sell",
            "entry": 1.14198,
            "stopLoss": 1.14415,
            "takeProfit": 1.13764,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1662651600000,
            "direction": "sell",
            "entry": 1.14901,
            "stopLoss": 1.1509399999999999,
            "takeProfit": 1.1451500000000006,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663766400000,
            "direction": "sell",
            "entry": 1.13382,
            "stopLoss": 1.13523,
            "takeProfit": 1.1310000000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663859700000,
            "direction": "sell",
            "entry": 1.12572,
            "stopLoss": 1.13529,
            "takeProfit": 1.1065800000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1665153600000,
            "direction": "sell",
            "entry": 1.1090200000000001,
            "stopLoss": 1.1218,
            "takeProfit": 1.0834600000000005,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at monthly 50% (1.1032)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1677686700000,
            "direction": "sell",
            "entry": 1.19893,
            "stopLoss": 1.20418,
            "takeProfit": 1.18843,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1677774600000,
            "direction": "sell",
            "entry": 1.1941300000000001,
            "stopLoss": 1.19632,
            "takeProfit": 1.1897500000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA",
              "at monthly low (1.19145)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1688391600000,
            "direction": "buy",
            "entry": 1.26941,
            "stopLoss": 1.26563,
            "takeProfit": 1.2769699999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1688736300000,
            "direction": "buy",
            "entry": 1.2773899999999998,
            "stopLoss": 1.2746300000000002,
            "takeProfit": 1.282909999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1688743200000,
            "direction": "buy",
            "entry": 1.28293,
            "stopLoss": 1.27484,
            "takeProfit": 1.2991099999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.28481)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1689261300000,
            "direction": "buy",
            "entry": 1.3105799999999999,
            "stopLoss": 1.30855,
            "takeProfit": 1.3146399999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1690379700000,
            "direction": "buy",
            "entry": 1.2914999999999999,
            "stopLoss": 1.2898100000000001,
            "takeProfit": 1.2948799999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1696256100000,
            "direction": "sell",
            "entry": 1.21211,
            "stopLoss": 1.21721,
            "takeProfit": 1.2019100000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at monthly low (1.21101)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1697203500000,
            "direction": "sell",
            "entry": 1.21621,
            "stopLoss": 1.2205899999999998,
            "takeProfit": 1.2074500000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1698237600000,
            "direction": "sell",
            "entry": 1.21205,
            "stopLoss": 1.21374,
            "takeProfit": 1.2086700000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA",
              "at monthly low (1.21101)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1698843600000,
            "direction": "sell",
            "entry": 1.21204,
            "stopLoss": 1.2149699999999999,
            "takeProfit": 1.2061800000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at quarterly low (1.21101)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1702561500000,
            "direction": "buy",
            "entry": 1.2708799999999998,
            "stopLoss": 1.26557,
            "takeProfit": 1.2814999999999992,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1702993200000,
            "direction": "buy",
            "entry": 1.27466,
            "stopLoss": 1.26921,
            "takeProfit": 1.2855599999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.27329)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703253300000,
            "direction": "buy",
            "entry": 1.27369,
            "stopLoss": 1.2705,
            "takeProfit": 1.28007,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.27329)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1703684400000,
            "direction": "buy",
            "entry": 1.27535,
            "stopLoss": 1.27258,
            "takeProfit": 1.2808899999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.27329)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1704722400000,
            "direction": "buy",
            "entry": 1.27127,
            "stopLoss": 1.26964,
            "takeProfit": 1.2745299999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1704893700000,
            "direction": "buy",
            "entry": 1.27327,
            "stopLoss": 1.27126,
            "takeProfit": 1.2772899999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1706191200000,
            "direction": "buy",
            "entry": 1.2736999999999998,
            "stopLoss": 1.27172,
            "takeProfit": 1.2776599999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708707000000,
            "direction": "buy",
            "entry": 1.26769,
            "stopLoss": 1.26604,
            "takeProfit": 1.2709899999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly 50% (1.269085)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708954800000,
            "direction": "buy",
            "entry": 1.26975,
            "stopLoss": 1.2678,
            "takeProfit": 1.2736499999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly 50% (1.269085)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708965900000,
            "direction": "buy",
            "entry": 1.2679799999999999,
            "stopLoss": 1.26667,
            "takeProfit": 1.2705999999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly 50% (1.269085)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1709050500000,
            "direction": "buy",
            "entry": 1.26917,
            "stopLoss": 1.26659,
            "takeProfit": 1.2743299999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open",
              "at monthly 50% (1.269085)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709309100000,
            "direction": "buy",
            "entry": 1.2650599999999999,
            "stopLoss": 1.25945,
            "takeProfit": 1.2762799999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (1.26451)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709823000000,
            "direction": "buy",
            "entry": 1.2760399999999998,
            "stopLoss": 1.2739500000000001,
            "takeProfit": 1.2802199999999992,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.27721)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1709904900000,
            "direction": "buy",
            "entry": 1.28691,
            "stopLoss": 1.2817800000000001,
            "takeProfit": 1.2971699999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at quarterly high (1.28272)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1710420000000,
            "direction": "buy",
            "entry": 1.28125,
            "stopLoss": 1.27987,
            "takeProfit": 1.2840099999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1716303900000,
            "direction": "buy",
            "entry": 1.27223,
            "stopLoss": 1.26813,
            "takeProfit": 1.28043,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.2709)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1716554400000,
            "direction": "buy",
            "entry": 1.2720699999999998,
            "stopLoss": 1.27084,
            "takeProfit": 1.2745299999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.2709)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1716813600000,
            "direction": "buy",
            "entry": 1.27538,
            "stopLoss": 1.27287,
            "takeProfit": 1.2804,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1717591800000,
            "direction": "buy",
            "entry": 1.2792,
            "stopLoss": 1.2761500000000001,
            "takeProfit": 1.2852999999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.28005)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1718195700000,
            "direction": "buy",
            "entry": 1.28351,
            "stopLoss": 1.27498,
            "takeProfit": 1.3005699999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.28005)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1720182900000,
            "direction": "buy",
            "entry": 1.2799299999999998,
            "stopLoss": 1.2777800000000001,
            "takeProfit": 1.284229999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1720446600000,
            "direction": "buy",
            "entry": 1.28425,
            "stopLoss": 1.28305,
            "takeProfit": 1.2866499999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1720624200000,
            "direction": "buy",
            "entry": 1.2837699999999999,
            "stopLoss": 1.2800200000000002,
            "takeProfit": 1.2912699999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1720792200000,
            "direction": "buy",
            "entry": 1.29674,
            "stopLoss": 1.29257,
            "takeProfit": 1.30508,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1721827800000,
            "direction": "buy",
            "entry": 1.2925099999999998,
            "stopLoss": 1.28948,
            "takeProfit": 1.2985699999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723734300000,
            "direction": "buy",
            "entry": 1.2860399999999998,
            "stopLoss": 1.2793400000000001,
            "takeProfit": 1.2994399999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (1.28604)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1724160600000,
            "direction": "buy",
            "entry": 1.3022699999999998,
            "stopLoss": 1.2987600000000001,
            "takeProfit": 1.3092899999999992,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1724330700000,
            "direction": "buy",
            "entry": 1.31148,
            "stopLoss": 1.30989,
            "takeProfit": 1.31466,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1724421600000,
            "direction": "buy",
            "entry": 1.31235,
            "stopLoss": 1.3110300000000001,
            "takeProfit": 1.3149899999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1724764200000,
            "direction": "buy",
            "entry": 1.32208,
            "stopLoss": 1.32082,
            "takeProfit": 1.3245999999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1725546000000,
            "direction": "buy",
            "entry": 1.3169899999999999,
            "stopLoss": 1.31482,
            "takeProfit": 1.3213299999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1726237500000,
            "direction": "buy",
            "entry": 1.3149,
            "stopLoss": 1.31094,
            "takeProfit": 1.3228199999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1726759200000,
            "direction": "buy",
            "entry": 1.3262399999999999,
            "stopLoss": 1.32146,
            "takeProfit": 1.3357999999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.32657)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1727107200000,
            "direction": "buy",
            "entry": 1.33517,
            "stopLoss": 1.3307200000000001,
            "takeProfit": 1.3440699999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1735828200000,
            "direction": "sell",
            "entry": 1.23995,
            "stopLoss": 1.2461799999999998,
            "takeProfit": 1.2274900000000006,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736352600000,
            "direction": "sell",
            "entry": 1.2335500000000001,
            "stopLoss": 1.23575,
            "takeProfit": 1.2291500000000006,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1736432400000,
            "direction": "sell",
            "entry": 1.2297200000000001,
            "stopLoss": 1.23279,
            "takeProfit": 1.2235800000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736861700000,
            "direction": "sell",
            "entry": 1.21537,
            "stopLoss": 1.2198,
            "takeProfit": 1.2065100000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737036300000,
            "direction": "sell",
            "entry": 1.21902,
            "stopLoss": 1.22174,
            "takeProfit": 1.2135799999999999,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737121800000,
            "direction": "sell",
            "entry": 1.21829,
            "stopLoss": 1.22214,
            "takeProfit": 1.2105900000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1743685800000,
            "direction": "buy",
            "entry": 1.31791,
            "stopLoss": 1.31326,
            "takeProfit": 1.3272099999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744375500000,
            "direction": "buy",
            "entry": 1.31009,
            "stopLoss": 1.3051000000000001,
            "takeProfit": 1.3200699999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744725900000,
            "direction": "buy",
            "entry": 1.32311,
            "stopLoss": 1.3213300000000001,
            "takeProfit": 1.3266699999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744727400000,
            "direction": "buy",
            "entry": 1.3228199999999999,
            "stopLoss": 1.3213300000000001,
            "takeProfit": 1.3257999999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744812300000,
            "direction": "buy",
            "entry": 1.3266399999999998,
            "stopLoss": 1.32451,
            "takeProfit": 1.3308999999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1744982400000,
            "direction": "buy",
            "entry": 1.3276999999999999,
            "stopLoss": 1.3261100000000001,
            "takeProfit": 1.3308799999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1745243100000,
            "direction": "buy",
            "entry": 1.3395899999999998,
            "stopLoss": 1.33761,
            "takeProfit": 1.3435499999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1745853600000,
            "direction": "buy",
            "entry": 1.3386099999999999,
            "stopLoss": 1.33327,
            "takeProfit": 1.3492899999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1746198300000,
            "direction": "buy",
            "entry": 1.33282,
            "stopLoss": 1.33046,
            "takeProfit": 1.3375399999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1746538500000,
            "direction": "buy",
            "entry": 1.33887,
            "stopLoss": 1.33024,
            "takeProfit": 1.3561299999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1747226700000,
            "direction": "buy",
            "entry": 1.3334599999999999,
            "stopLoss": 1.33216,
            "takeProfit": 1.3360599999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1747230600000,
            "direction": "buy",
            "entry": 1.33256,
            "stopLoss": 1.3310600000000001,
            "takeProfit": 1.3355599999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1747835100000,
            "direction": "buy",
            "entry": 1.34283,
            "stopLoss": 1.33951,
            "takeProfit": 1.34947,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.34438)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748350500000,
            "direction": "buy",
            "entry": 1.3558599999999998,
            "stopLoss": 1.35284,
            "takeProfit": 1.3618999999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748869200000,
            "direction": "buy",
            "entry": 1.35435,
            "stopLoss": 1.3521800000000002,
            "takeProfit": 1.3586899999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748879400000,
            "direction": "buy",
            "entry": 1.3554199999999998,
            "stopLoss": 1.35131,
            "takeProfit": 1.3636399999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1749128100000,
            "direction": "buy",
            "entry": 1.35805,
            "stopLoss": 1.35644,
            "takeProfit": 1.3612699999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749130500000,
            "direction": "buy",
            "entry": 1.36082,
            "stopLoss": 1.35606,
            "takeProfit": 1.3703399999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749732000000,
            "direction": "buy",
            "entry": 1.3615,
            "stopLoss": 1.35741,
            "takeProfit": 1.3696799999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1750077600000,
            "direction": "buy",
            "entry": 1.35831,
            "stopLoss": 1.3570600000000002,
            "takeProfit": 1.3608099999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1750084200000,
            "direction": "buy",
            "entry": 1.36137,
            "stopLoss": 1.35684,
            "takeProfit": 1.3704299999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1750773600000,
            "direction": "buy",
            "entry": 1.3599899999999998,
            "stopLoss": 1.35991,
            "takeProfit": 1.3601499999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1750773900000,
            "direction": "buy",
            "entry": 1.3607099999999999,
            "stopLoss": 1.35856,
            "takeProfit": 1.3650099999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.35929)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1751027700000,
            "direction": "buy",
            "entry": 1.3744399999999999,
            "stopLoss": 1.3727,
            "takeProfit": 1.3779199999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1755002400000,
            "direction": "buy",
            "entry": 1.3498199999999998,
            "stopLoss": 1.3441,
            "takeProfit": 1.3612599999999992,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly 50% (1.34869)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1756211700000,
            "direction": "buy",
            "entry": 1.3488699999999998,
            "stopLoss": 1.3467,
            "takeProfit": 1.3532099999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly 50% (1.34869)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1756385100000,
            "direction": "buy",
            "entry": 1.35164,
            "stopLoss": 1.34945,
            "takeProfit": 1.3560199999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1756396800000,
            "direction": "buy",
            "entry": 1.35158,
            "stopLoss": 1.3483800000000001,
            "takeProfit": 1.3579799999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757346600000,
            "direction": "buy",
            "entry": 1.3541999999999998,
            "stopLoss": 1.3525500000000001,
            "takeProfit": 1.3574999999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757603400000,
            "direction": "buy",
            "entry": 1.3560699999999999,
            "stopLoss": 1.34869,
            "takeProfit": 1.3708299999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1765805700000,
            "direction": "buy",
            "entry": 1.33926,
            "stopLoss": 1.33779,
            "takeProfit": 1.3421999999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1765895100000,
            "direction": "buy",
            "entry": 1.3428799999999999,
            "stopLoss": 1.34214,
            "takeProfit": 1.3443599999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1765901700000,
            "direction": "buy",
            "entry": 1.34238,
            "stopLoss": 1.3398700000000001,
            "takeProfit": 1.3473999999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1766412900000,
            "direction": "buy",
            "entry": 1.34388,
            "stopLoss": 1.34209,
            "takeProfit": 1.3474599999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1767026700000,
            "direction": "buy",
            "entry": 1.3496899999999998,
            "stopLoss": 1.34807,
            "takeProfit": 1.3529299999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1767631500000,
            "direction": "buy",
            "entry": 1.3520599999999998,
            "stopLoss": 1.34198,
            "takeProfit": 1.3722199999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.3534)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1769175900000,
            "direction": "buy",
            "entry": 1.3531499999999999,
            "stopLoss": 1.35088,
            "takeProfit": 1.3576899999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.3534)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1769522700000,
            "direction": "buy",
            "entry": 1.37381,
            "stopLoss": 1.3658700000000001,
            "takeProfit": 1.3896899999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1776096000000,
            "direction": "buy",
            "entry": 1.3458999999999999,
            "stopLoss": 1.34107,
            "takeProfit": 1.3555599999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1776174300000,
            "direction": "buy",
            "entry": 1.3581599999999998,
            "stopLoss": 1.35288,
            "takeProfit": 1.3687199999999993,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1776957900000,
            "direction": "buy",
            "entry": 1.3508499999999999,
            "stopLoss": 1.3473300000000001,
            "takeProfit": 1.3578899999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at quarterly 50% (1.3513950000000001)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1777035600000,
            "direction": "buy",
            "entry": 1.3502399999999999,
            "stopLoss": 1.34551,
            "takeProfit": 1.3596999999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at quarterly 50% (1.3513950000000001)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1777554600000,
            "direction": "buy",
            "entry": 1.35168,
            "stopLoss": 1.34934,
            "takeProfit": 1.35636,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at quarterly 50% (1.3513950000000001)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1778160900000,
            "direction": "buy",
            "entry": 1.36286,
            "stopLoss": 1.36042,
            "takeProfit": 1.36774,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.36119)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1778244000000,
            "direction": "buy",
            "entry": 1.3623699999999999,
            "stopLoss": 1.35952,
            "takeProfit": 1.3680699999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.36119)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1778503500000,
            "direction": "buy",
            "entry": 1.36123,
            "stopLoss": 1.3580400000000001,
            "takeProfit": 1.3676099999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.36119)"
            ]
          }
        }
      ]
    },
    "EURUSD": {
      "15m": [
        {
          "outcome": "loss",
          "signal": {
            "time": 1662469200000,
            "direction": "sell",
            "entry": 0.98991,
            "stopLoss": 0.99347,
            "takeProfit": 0.9827899999999999,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at monthly low (0.99002)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663941600000,
            "direction": "sell",
            "entry": 0.97329,
            "stopLoss": 0.9773499999999999,
            "takeProfit": 0.9651700000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1664803800000,
            "direction": "sell",
            "entry": 0.97724,
            "stopLoss": 0.97908,
            "takeProfit": 0.9735600000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1665061200000,
            "direction": "sell",
            "entry": 0.98673,
            "stopLoss": 0.9897999999999999,
            "takeProfit": 0.9805900000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA",
              "at daily open",
              "at monthly 50% (0.98667)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1665146700000,
            "direction": "sell",
            "entry": 0.97521,
            "stopLoss": 0.98095,
            "takeProfit": 0.9637300000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1667480400000,
            "direction": "sell",
            "entry": 0.97397,
            "stopLoss": 0.9768399999999999,
            "takeProfit": 0.9682300000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1680618600000,
            "direction": "buy",
            "entry": 1.09564,
            "stopLoss": 1.08817,
            "takeProfit": 1.1105799999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.09296)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682004600000,
            "direction": "buy",
            "entry": 1.09718,
            "stopLoss": 1.09595,
            "takeProfit": 1.0996400000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682341200000,
            "direction": "buy",
            "entry": 1.10238,
            "stopLoss": 1.09941,
            "takeProfit": 1.1083199999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (1.10327)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682697600000,
            "direction": "buy",
            "entry": 1.10404,
            "stopLoss": 1.09857,
            "takeProfit": 1.1149799999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly high (1.10327)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1683119700000,
            "direction": "buy",
            "entry": 1.10419,
            "stopLoss": 1.1017000000000001,
            "takeProfit": 1.1091699999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at quarterly high (1.10327)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1685973600000,
            "direction": "sell",
            "entry": 1.06792,
            "stopLoss": 1.0704,
            "takeProfit": 1.06296,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1686061800000,
            "direction": "sell",
            "entry": 1.06768,
            "stopLoss": 1.06876,
            "takeProfit": 1.06552,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1688391000000,
            "direction": "buy",
            "entry": 1.09145,
            "stopLoss": 1.08873,
            "takeProfit": 1.0968900000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1689170400000,
            "direction": "buy",
            "entry": 1.10988,
            "stopLoss": 1.10086,
            "takeProfit": 1.12792,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly high (1.10952)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1696257900000,
            "direction": "sell",
            "entry": 1.04959,
            "stopLoss": 1.05325,
            "takeProfit": 1.04227,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at monthly low (1.0488)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1697208300000,
            "direction": "sell",
            "entry": 1.0505,
            "stopLoss": 1.05349,
            "takeProfit": 1.04452,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at monthly low (1.0488)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1703171700000,
            "direction": "buy",
            "entry": 1.09879,
            "stopLoss": 1.09674,
            "takeProfit": 1.1028899999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703255400000,
            "direction": "buy",
            "entry": 1.10296,
            "stopLoss": 1.09966,
            "takeProfit": 1.1095599999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.10171)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1703605500000,
            "direction": "buy",
            "entry": 1.1029,
            "stopLoss": 1.10088,
            "takeProfit": 1.1069399999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.10171)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708957800000,
            "direction": "buy",
            "entry": 1.0850899999999999,
            "stopLoss": 1.08433,
            "takeProfit": 1.0866099999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708965900000,
            "direction": "buy",
            "entry": 1.0852,
            "stopLoss": 1.08336,
            "takeProfit": 1.0888799999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709562600000,
            "direction": "buy",
            "entry": 1.08514,
            "stopLoss": 1.08351,
            "takeProfit": 1.0884,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709739000000,
            "direction": "buy",
            "entry": 1.08913,
            "stopLoss": 1.0862500000000002,
            "takeProfit": 1.0948899999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.08974)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1710339300000,
            "direction": "buy",
            "entry": 1.09361,
            "stopLoss": 1.0928600000000002,
            "takeProfit": 1.0951099999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1717424100000,
            "direction": "buy",
            "entry": 1.08805,
            "stopLoss": 1.08355,
            "takeProfit": 1.0970499999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly 50% (1.08698)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1722870000000,
            "direction": "buy",
            "entry": 1.09803,
            "stopLoss": 1.0928,
            "takeProfit": 1.1084900000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723216500000,
            "direction": "buy",
            "entry": 1.0925799999999999,
            "stopLoss": 1.0904,
            "takeProfit": 1.0969399999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly high (1.0916)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1723643100000,
            "direction": "buy",
            "entry": 1.10422,
            "stopLoss": 1.09989,
            "takeProfit": 1.1128799999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1724157900000,
            "direction": "buy",
            "entry": 1.1087,
            "stopLoss": 1.1071600000000001,
            "takeProfit": 1.1117799999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1725543000000,
            "direction": "buy",
            "entry": 1.11073,
            "stopLoss": 1.1082100000000001,
            "takeProfit": 1.1157699999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1726668000000,
            "direction": "buy",
            "entry": 1.11362,
            "stopLoss": 1.1112900000000001,
            "takeProfit": 1.11828,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1727365500000,
            "direction": "buy",
            "entry": 1.11864,
            "stopLoss": 1.1120700000000001,
            "takeProfit": 1.13178,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.12015)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1734965100000,
            "direction": "sell",
            "entry": 1.03963,
            "stopLoss": 1.04134,
            "takeProfit": 1.0362100000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1735047900000,
            "direction": "sell",
            "entry": 1.03935,
            "stopLoss": 1.04086,
            "takeProfit": 1.0363300000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1735663500000,
            "direction": "sell",
            "entry": 1.03469,
            "stopLoss": 1.03941,
            "takeProfit": 1.0252500000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at monthly low (1.03325)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736345700000,
            "direction": "sell",
            "entry": 1.02977,
            "stopLoss": 1.03051,
            "takeProfit": 1.0282900000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737039600000,
            "direction": "sell",
            "entry": 1.0278100000000001,
            "stopLoss": 1.02901,
            "takeProfit": 1.0254100000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744813800000,
            "direction": "buy",
            "entry": 1.13645,
            "stopLoss": 1.1335300000000001,
            "takeProfit": 1.1422899999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1746544500000,
            "direction": "buy",
            "entry": 1.13444,
            "stopLoss": 1.13211,
            "takeProfit": 1.1390999999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1747836000000,
            "direction": "buy",
            "entry": 1.13378,
            "stopLoss": 1.1312200000000001,
            "takeProfit": 1.1388999999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748004300000,
            "direction": "buy",
            "entry": 1.13493,
            "stopLoss": 1.12923,
            "takeProfit": 1.14633,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748880000000,
            "direction": "buy",
            "entry": 1.14314,
            "stopLoss": 1.13992,
            "takeProfit": 1.14958,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at monthly high (1.14185)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1749559500000,
            "direction": "buy",
            "entry": 1.1434,
            "stopLoss": 1.13679,
            "takeProfit": 1.15662,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.14185)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1750078800000,
            "direction": "buy",
            "entry": 1.15848,
            "stopLoss": 1.15646,
            "takeProfit": 1.1625199999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1750167900000,
            "direction": "buy",
            "entry": 1.15631,
            "stopLoss": 1.15426,
            "takeProfit": 1.1604099999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1751031900000,
            "direction": "buy",
            "entry": 1.17287,
            "stopLoss": 1.16979,
            "takeProfit": 1.17903,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1751293800000,
            "direction": "buy",
            "entry": 1.17363,
            "stopLoss": 1.17025,
            "takeProfit": 1.1803899999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1751643000000,
            "direction": "buy",
            "entry": 1.17831,
            "stopLoss": 1.1770100000000001,
            "takeProfit": 1.1809099999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.17881)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1755099000000,
            "direction": "buy",
            "entry": 1.17172,
            "stopLoss": 1.1687800000000002,
            "takeProfit": 1.1776,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1755261900000,
            "direction": "buy",
            "entry": 1.16956,
            "stopLoss": 1.16764,
            "takeProfit": 1.1733999999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1756477800000,
            "direction": "buy",
            "entry": 1.16864,
            "stopLoss": 1.16457,
            "takeProfit": 1.1767799999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757335500000,
            "direction": "buy",
            "entry": 1.17356,
            "stopLoss": 1.17195,
            "takeProfit": 1.1767799999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 15m 20 SMA",
              "at monthly high (1.17425)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757603700000,
            "direction": "buy",
            "entry": 1.17375,
            "stopLoss": 1.1653900000000001,
            "takeProfit": 1.19047,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.17425)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1758549600000,
            "direction": "buy",
            "entry": 1.17775,
            "stopLoss": 1.1768100000000001,
            "takeProfit": 1.17963,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 15m 20 SMA",
              "at quarterly high (1.17881)"
            ]
          }
        }
      ],
      "5m": [
        {
          "outcome": "loss",
          "signal": {
            "time": 1662043800000,
            "direction": "sell",
            "entry": 0.9913500000000001,
            "stopLoss": 1.00275,
            "takeProfit": 0.9685500000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at monthly low (0.99002)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1662468300000,
            "direction": "sell",
            "entry": 0.99213,
            "stopLoss": 0.9942099999999999,
            "takeProfit": 0.98797,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA",
              "at daily open",
              "at monthly low (0.99002)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1662554700000,
            "direction": "sell",
            "entry": 0.98821,
            "stopLoss": 0.9934999999999999,
            "takeProfit": 0.9776300000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA",
              "at monthly low (0.99002)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663775700000,
            "direction": "sell",
            "entry": 0.98823,
            "stopLoss": 0.99252,
            "takeProfit": 0.9796500000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA",
              "at monthly low (0.99002)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1663937400000,
            "direction": "sell",
            "entry": 0.97492,
            "stopLoss": 0.97764,
            "takeProfit": 0.9694800000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1664292300000,
            "direction": "sell",
            "entry": 0.9597100000000001,
            "stopLoss": 0.96485,
            "takeProfit": 0.9494300000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1664800800000,
            "direction": "sell",
            "entry": 0.97619,
            "stopLoss": 0.97908,
            "takeProfit": 0.9704100000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1665061500000,
            "direction": "sell",
            "entry": 0.9855700000000001,
            "stopLoss": 0.9897999999999999,
            "takeProfit": 0.9771100000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA",
              "at monthly 50% (0.98667)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1665408300000,
            "direction": "sell",
            "entry": 0.97051,
            "stopLoss": 0.97115,
            "takeProfit": 0.96923,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1665417300000,
            "direction": "sell",
            "entry": 0.9699,
            "stopLoss": 0.97507,
            "takeProfit": 0.95956,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1665579000000,
            "direction": "sell",
            "entry": 0.97015,
            "stopLoss": 0.97249,
            "takeProfit": 0.9654699999999999,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1667481600000,
            "direction": "sell",
            "entry": 0.97463,
            "stopLoss": 0.9768399999999999,
            "takeProfit": 0.9702100000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1680537600000,
            "direction": "buy",
            "entry": 1.08913,
            "stopLoss": 1.08565,
            "takeProfit": 1.0960899999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1681307400000,
            "direction": "buy",
            "entry": 1.09752,
            "stopLoss": 1.09146,
            "takeProfit": 1.10964,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682084100000,
            "direction": "buy",
            "entry": 1.09872,
            "stopLoss": 1.09683,
            "takeProfit": 1.1024999999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682342700000,
            "direction": "buy",
            "entry": 1.10221,
            "stopLoss": 1.09941,
            "takeProfit": 1.1078099999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly high (1.10327)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682512500000,
            "direction": "buy",
            "entry": 1.10526,
            "stopLoss": 1.1026200000000002,
            "takeProfit": 1.1105399999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at quarterly high (1.10327)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1682694600000,
            "direction": "buy",
            "entry": 1.10344,
            "stopLoss": 1.09857,
            "takeProfit": 1.1131799999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly high (1.10327)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1683119400000,
            "direction": "buy",
            "entry": 1.10386,
            "stopLoss": 1.1017000000000001,
            "takeProfit": 1.10818,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at quarterly high (1.10327)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1685973600000,
            "direction": "sell",
            "entry": 1.06792,
            "stopLoss": 1.0704,
            "takeProfit": 1.06296,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1686058800000,
            "direction": "sell",
            "entry": 1.06722,
            "stopLoss": 1.07052,
            "takeProfit": 1.0606200000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1688391600000,
            "direction": "buy",
            "entry": 1.09127,
            "stopLoss": 1.08873,
            "takeProfit": 1.09635,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1688733300000,
            "direction": "buy",
            "entry": 1.09254,
            "stopLoss": 1.08728,
            "takeProfit": 1.1030600000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1689168300000,
            "direction": "buy",
            "entry": 1.10816,
            "stopLoss": 1.10086,
            "takeProfit": 1.1227600000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at quarterly high (1.10952)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1689344400000,
            "direction": "buy",
            "entry": 1.12281,
            "stopLoss": 1.1205100000000001,
            "takeProfit": 1.12741,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1689606900000,
            "direction": "buy",
            "entry": 1.12316,
            "stopLoss": 1.11983,
            "takeProfit": 1.1298199999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1696250400000,
            "direction": "sell",
            "entry": 1.05321,
            "stopLoss": 1.05474,
            "takeProfit": 1.05015,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1696257600000,
            "direction": "sell",
            "entry": 1.04993,
            "stopLoss": 1.05474,
            "takeProfit": 1.04031,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at monthly low (1.0488)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1697205300000,
            "direction": "sell",
            "entry": 1.05257,
            "stopLoss": 1.05523,
            "takeProfit": 1.0472500000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1702569000000,
            "direction": "buy",
            "entry": 1.09844,
            "stopLoss": 1.09012,
            "takeProfit": 1.1150800000000003,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703000700000,
            "direction": "buy",
            "entry": 1.09759,
            "stopLoss": 1.09487,
            "takeProfit": 1.1030300000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1703169300000,
            "direction": "buy",
            "entry": 1.10003,
            "stopLoss": 1.09674,
            "takeProfit": 1.10661,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.10171)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1703685300000,
            "direction": "buy",
            "entry": 1.10678,
            "stopLoss": 1.1043500000000002,
            "takeProfit": 1.11164,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1703695200000,
            "direction": "buy",
            "entry": 1.11179,
            "stopLoss": 1.10571,
            "takeProfit": 1.1239500000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1708955100000,
            "direction": "buy",
            "entry": 1.08563,
            "stopLoss": 1.0822,
            "takeProfit": 1.0924900000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1709312100000,
            "direction": "buy",
            "entry": 1.08348,
            "stopLoss": 1.07931,
            "takeProfit": 1.09182,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1709913000000,
            "direction": "buy",
            "entry": 1.09573,
            "stopLoss": 1.09398,
            "takeProfit": 1.0992300000000004,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1710333900000,
            "direction": "buy",
            "entry": 1.09409,
            "stopLoss": 1.09151,
            "takeProfit": 1.09925,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1717423500000,
            "direction": "buy",
            "entry": 1.08709,
            "stopLoss": 1.08355,
            "takeProfit": 1.0941699999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at quarterly 50% (1.08698)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1722870000000,
            "direction": "buy",
            "entry": 1.09803,
            "stopLoss": 1.0928,
            "takeProfit": 1.1084900000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1723215900000,
            "direction": "buy",
            "entry": 1.09251,
            "stopLoss": 1.0904,
            "takeProfit": 1.0967300000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at quarterly high (1.0916)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1723642500000,
            "direction": "buy",
            "entry": 1.10332,
            "stopLoss": 1.09989,
            "takeProfit": 1.1101800000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1724072400000,
            "direction": "buy",
            "entry": 1.10399,
            "stopLoss": 1.1027500000000001,
            "takeProfit": 1.1064699999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1724082600000,
            "direction": "buy",
            "entry": 1.10686,
            "stopLoss": 1.10251,
            "takeProfit": 1.1155599999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1725542700000,
            "direction": "buy",
            "entry": 1.11049,
            "stopLoss": 1.1088,
            "takeProfit": 1.11387,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1727365500000,
            "direction": "buy",
            "entry": 1.11864,
            "stopLoss": 1.1120700000000001,
            "takeProfit": 1.13178,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.12015)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1733148600000,
            "direction": "sell",
            "entry": 1.05065,
            "stopLoss": 1.05432,
            "takeProfit": 1.0433100000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1734360600000,
            "direction": "sell",
            "entry": 1.04775,
            "stopLoss": 1.05297,
            "takeProfit": 1.03731,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1734452100000,
            "direction": "sell",
            "entry": 1.05002,
            "stopLoss": 1.0514299999999999,
            "takeProfit": 1.0472000000000001,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1734961200000,
            "direction": "sell",
            "entry": 1.03905,
            "stopLoss": 1.04063,
            "takeProfit": 1.0358900000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1734965100000,
            "direction": "sell",
            "entry": 1.03963,
            "stopLoss": 1.04063,
            "takeProfit": 1.0376300000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1735047600000,
            "direction": "sell",
            "entry": 1.03969,
            "stopLoss": 1.04086,
            "takeProfit": 1.0373500000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1735059000000,
            "direction": "sell",
            "entry": 1.0388600000000001,
            "stopLoss": 1.04148,
            "takeProfit": 1.0336200000000004,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1735577400000,
            "direction": "sell",
            "entry": 1.03784,
            "stopLoss": 1.04138,
            "takeProfit": 1.0307600000000003,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1735653900000,
            "direction": "sell",
            "entry": 1.03839,
            "stopLoss": 1.04249,
            "takeProfit": 1.03019,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736346600000,
            "direction": "sell",
            "entry": 1.02924,
            "stopLoss": 1.03051,
            "takeProfit": 1.0266999999999997,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1736441700000,
            "direction": "sell",
            "entry": 1.02968,
            "stopLoss": 1.03195,
            "takeProfit": 1.02514,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1736520600000,
            "direction": "sell",
            "entry": 1.02583,
            "stopLoss": 1.03168,
            "takeProfit": 1.0141300000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bear-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737034500000,
            "direction": "sell",
            "entry": 1.02735,
            "stopLoss": 1.02969,
            "takeProfit": 1.02267,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1737124500000,
            "direction": "sell",
            "entry": 1.0284,
            "stopLoss": 1.0314999999999999,
            "takeProfit": 1.0222000000000002,
            "reasons": [
              "bearish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-up",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1743684300000,
            "direction": "buy",
            "entry": 1.10917,
            "stopLoss": 1.1033600000000001,
            "takeProfit": 1.1207899999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1744290300000,
            "direction": "buy",
            "entry": 1.10991,
            "stopLoss": 1.10619,
            "takeProfit": 1.1173499999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1744809000000,
            "direction": "buy",
            "entry": 1.13609,
            "stopLoss": 1.1350200000000001,
            "takeProfit": 1.1382299999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1744813200000,
            "direction": "buy",
            "entry": 1.1364,
            "stopLoss": 1.1335300000000001,
            "takeProfit": 1.14214,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1744985100000,
            "direction": "buy",
            "entry": 1.13844,
            "stopLoss": 1.1371900000000001,
            "takeProfit": 1.1409399999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1745853600000,
            "direction": "buy",
            "entry": 1.13795,
            "stopLoss": 1.1334300000000002,
            "takeProfit": 1.1469899999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1746452100000,
            "direction": "buy",
            "entry": 1.13563,
            "stopLoss": 1.13277,
            "takeProfit": 1.1413499999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1746629100000,
            "direction": "buy",
            "entry": 1.13689,
            "stopLoss": 1.13477,
            "takeProfit": 1.1411299999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1747836000000,
            "direction": "buy",
            "entry": 1.13378,
            "stopLoss": 1.1312200000000001,
            "takeProfit": 1.1388999999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748003700000,
            "direction": "buy",
            "entry": 1.13379,
            "stopLoss": 1.13277,
            "takeProfit": 1.1358300000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1748007600000,
            "direction": "buy",
            "entry": 1.1328799999999999,
            "stopLoss": 1.12923,
            "takeProfit": 1.1401799999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748531100000,
            "direction": "buy",
            "entry": 1.1357599999999999,
            "stopLoss": 1.13341,
            "takeProfit": 1.1404599999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1748867700000,
            "direction": "buy",
            "entry": 1.14271,
            "stopLoss": 1.14042,
            "takeProfit": 1.1472899999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at monthly high (1.14185)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1749128400000,
            "direction": "buy",
            "entry": 1.14303,
            "stopLoss": 1.1410900000000002,
            "takeProfit": 1.1469099999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (1.14185)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1749133500000,
            "direction": "buy",
            "entry": 1.14719,
            "stopLoss": 1.14131,
            "takeProfit": 1.1589499999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1749559500000,
            "direction": "buy",
            "entry": 1.1434,
            "stopLoss": 1.13679,
            "takeProfit": 1.15662,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.14185)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1750077300000,
            "direction": "buy",
            "entry": 1.15787,
            "stopLoss": 1.15646,
            "takeProfit": 1.1606899999999998,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1750166400000,
            "direction": "buy",
            "entry": 1.1569099999999999,
            "stopLoss": 1.15524,
            "takeProfit": 1.1602499999999996,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1750426200000,
            "direction": "buy",
            "entry": 1.15193,
            "stopLoss": 1.15067,
            "takeProfit": 1.1544499999999995,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1751031600000,
            "direction": "buy",
            "entry": 1.173,
            "stopLoss": 1.16979,
            "takeProfit": 1.17942,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1751293200000,
            "direction": "buy",
            "entry": 1.173,
            "stopLoss": 1.17025,
            "takeProfit": 1.1785,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1751377200000,
            "direction": "buy",
            "entry": 1.18074,
            "stopLoss": 1.18008,
            "takeProfit": 1.1820599999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.17881)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1751377800000,
            "direction": "buy",
            "entry": 1.18096,
            "stopLoss": 1.18008,
            "takeProfit": 1.18272,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (1.17881)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1751641800000,
            "direction": "buy",
            "entry": 1.17802,
            "stopLoss": 1.1758600000000001,
            "takeProfit": 1.18234,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA",
              "at monthly high (1.17881)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1754666400000,
            "direction": "buy",
            "entry": 1.16653,
            "stopLoss": 1.16411,
            "takeProfit": 1.1713700000000002,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1755098700000,
            "direction": "buy",
            "entry": 1.17158,
            "stopLoss": 1.1687800000000002,
            "takeProfit": 1.17718,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1755261600000,
            "direction": "buy",
            "entry": 1.16959,
            "stopLoss": 1.16764,
            "takeProfit": 1.1734899999999997,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1755611400000,
            "direction": "buy",
            "entry": 1.16781,
            "stopLoss": 1.16665,
            "takeProfit": 1.1701300000000001,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1755702600000,
            "direction": "buy",
            "entry": 1.1661299999999999,
            "stopLoss": 1.1643400000000002,
            "takeProfit": 1.1697099999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at 5m 20 SMA"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1756477200000,
            "direction": "buy",
            "entry": 1.1685699999999999,
            "stopLoss": 1.16457,
            "takeProfit": 1.1765699999999994,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at daily open"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757334900000,
            "direction": "buy",
            "entry": 1.17306,
            "stopLoss": 1.17195,
            "takeProfit": 1.1752799999999999,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.17425)"
            ]
          }
        },
        {
          "outcome": "loss",
          "signal": {
            "time": 1757337600000,
            "direction": "buy",
            "entry": 1.17507,
            "stopLoss": 1.17178,
            "takeProfit": 1.18165,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "rejection-down",
              "at monthly high (1.17425)"
            ]
          }
        },
        {
          "outcome": "win",
          "signal": {
            "time": 1757603700000,
            "direction": "buy",
            "entry": 1.17375,
            "stopLoss": 1.1653900000000001,
            "takeProfit": 1.19047,
            "reasons": [
              "bullish M/W/D bias",
              "3h & 45m aligned with healthy candles",
              "bull-momentum",
              "at 5m 20 SMA",
              "at monthly high (1.17425)"
            ]
          }
        }
      ]
    }
  },
  "decimals": {
    "XAUUSD": 2,
    "GBPUSD": 5,
    "EURUSD": 5
  },
  "periods": {
    "full": "Full history",
    "ytd": "2026 Jan-Jul",
    "ytdFrom": 1767225600000,
    "ytdTo": 1783382400000
  }
} as const satisfies {
  pairs: Record<ArgusPair, Record<ArgusTimeframe, readonly ArgusBacktestTrade[]>>;
  decimals: Record<ArgusPair, number>;
  periods: { full: string; ytd: string; ytdFrom: number; ytdTo: number };
};
