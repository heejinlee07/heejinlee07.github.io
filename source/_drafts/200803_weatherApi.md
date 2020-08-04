

open weather one call API

API 호출 1번으로 특정 위치에 대한 모든 필수 날씨 데이터 획득
좌표에 따라 다음과 같은 데이터를 제공

- 현재 날씨
- 분 단위 예보: 1시간
- 시간당 예보: 48시간
- 일일예보: 7일
- 지나간 예보: 지난 5일

## 현재, 분단위, 시간단위, 일일예보의 경우

API call:
https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&
exclude={part}&appid={YOUR API KEY}

- lat, lon: 지리적 좌표(위도, 경도)
- API key: 내가 발급받은 api key
- part(옵션): 응답받은 데이터에서 특정 부분을 제거할 수 있다. 단 공백이 없는 리스트여야 한다. (current, minutely, hourly, daily 에서 가능. 단 minute는 특정 지역에서만 사용가능.)

Example of API call:
https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&
exclude=hourly,daily&appid={YOUR API KEY}

## API 응답 필드

{
    "lat": 33.44,
    "lon": -94.04,
    "timezone": "America/Chicago",
    "timezone_offset": -18000,
    "current": {
        "dt": 1596453032,
        "sunrise": 1596454228,
        "sunset": 1596503643,
        "temp": 293.53,
        "feels_like": 295.25,
        "pressure": 1015,
        "humidity": 88,
        "dew_point": 291.48,
        "uvi": 9.97,
        "clouds": 1,
        "visibility": 10000,
        "wind_speed": 1.74,
        "wind_deg": 336,
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
            }
        ]
    },
    "minutely": [
        {
            "dt": 1596453060,
            "precipitation": 0
        },
        {
            "dt": 1596453120,
            "precipitation": 0
        },
        {
            "dt": 1596453180,
            "precipitation": 0
        },
        {
            "dt": 1596453240,
            "precipitation": 0
        },
        {
            "dt": 1596453300,
            "precipitation": 0
        },
        {
            "dt": 1596453360,
            "precipitation": 0
        },
        {
            "dt": 1596453420,
            "precipitation": 0
        },
        {
            "dt": 1596453480,
            "precipitation": 0
        },
        {
            "dt": 1596453540,
            "precipitation": 0
        },
        {
            "dt": 1596453600,
            "precipitation": 0
        },
        {
            "dt": 1596453660,
            "precipitation": 0
        },
        {
            "dt": 1596453720,
            "precipitation": 0
        },
        {
            "dt": 1596453780,
            "precipitation": 0
        },
        {
            "dt": 1596453840,
            "precipitation": 0
        },
        {
            "dt": 1596453900,
            "precipitation": 0
        },
        {
            "dt": 1596453960,
            "precipitation": 0
        },
        {
            "dt": 1596454020,
            "precipitation": 0
        },
        {
            "dt": 1596454080,
            "precipitation": 0
        },
        {
            "dt": 1596454140,
            "precipitation": 0
        },
        {
            "dt": 1596454200,
            "precipitation": 0
        },
        {
            "dt": 1596454260,
            "precipitation": 0
        },
        {
            "dt": 1596454320,
            "precipitation": 0
        },
        {
            "dt": 1596454380,
            "precipitation": 0
        },
        {
            "dt": 1596454440,
            "precipitation": 0
        },
        {
            "dt": 1596454500,
            "precipitation": 0
        },
        {
            "dt": 1596454560,
            "precipitation": 0
        },
        {
            "dt": 1596454620,
            "precipitation": 0
        },
        {
            "dt": 1596454680,
            "precipitation": 0
        },
        {
            "dt": 1596454740,
            "precipitation": 0
        },
        {
            "dt": 1596454800,
            "precipitation": 0
        },
        {
            "dt": 1596454860,
            "precipitation": 0
        },
        {
            "dt": 1596454920,
            "precipitation": 0
        },
        {
            "dt": 1596454980,
            "precipitation": 0
        },
        {
            "dt": 1596455040,
            "precipitation": 0
        },
        {
            "dt": 1596455100,
            "precipitation": 0
        },
        {
            "dt": 1596455160,
            "precipitation": 0
        },
        {
            "dt": 1596455220,
            "precipitation": 0
        },
        {
            "dt": 1596455280,
            "precipitation": 0
        },
        {
            "dt": 1596455340,
            "precipitation": 0
        },
        {
            "dt": 1596455400,
            "precipitation": 0
        },
        {
            "dt": 1596455460,
            "precipitation": 0
        },
        {
            "dt": 1596455520,
            "precipitation": 0
        },
        {
            "dt": 1596455580,
            "precipitation": 0
        },
        {
            "dt": 1596455640,
            "precipitation": 0
        },
        {
            "dt": 1596455700,
            "precipitation": 0
        },
        {
            "dt": 1596455760,
            "precipitation": 0
        },
        {
            "dt": 1596455820,
            "precipitation": 0
        },
        {
            "dt": 1596455880,
            "precipitation": 0
        },
        {
            "dt": 1596455940,
            "precipitation": 0
        },
        {
            "dt": 1596456000,
            "precipitation": 0
        },
        {
            "dt": 1596456060,
            "precipitation": 0
        },
        {
            "dt": 1596456120,
            "precipitation": 0
        },
        {
            "dt": 1596456180,
            "precipitation": 0
        },
        {
            "dt": 1596456240,
            "precipitation": 0
        },
        {
            "dt": 1596456300,
            "precipitation": 0
        },
        {
            "dt": 1596456360,
            "precipitation": 0
        },
        {
            "dt": 1596456420,
            "precipitation": 0
        },
        {
            "dt": 1596456480,
            "precipitation": 0
        },
        {
            "dt": 1596456540,
            "precipitation": 0
        },
        {
            "dt": 1596456600,
            "precipitation": 0
        },
        {
            "dt": 1596456660,
            "precipitation": 0
        }
    ],
    "hourly": [
        {
            "dt": 1596452400,
            "temp": 293.53,
            "feels_like": 295.25,
            "pressure": 1015,
            "humidity": 88,
            "dew_point": 291.48,
            "clouds": 1,
            "visibility": 10000,
            "wind_speed": 1.74,
            "wind_deg": 336,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0.21
        },
        {
            "dt": 1596456000,
            "temp": 293.54,
            "feels_like": 295.4,
            "pressure": 1015,
            "humidity": 89,
            "dew_point": 291.67,
            "clouds": 8,
            "visibility": 10000,
            "wind_speed": 1.65,
            "wind_deg": 330,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0.2
        },
        {
            "dt": 1596459600,
            "temp": 294.82,
            "feels_like": 296.78,
            "pressure": 1016,
            "humidity": 86,
            "dew_point": 292.38,
            "clouds": 20,
            "visibility": 10000,
            "wind_speed": 1.96,
            "wind_deg": 329,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596463200,
            "temp": 296.67,
            "feels_like": 298.36,
            "pressure": 1016,
            "humidity": 80,
            "dew_point": 293.02,
            "clouds": 12,
            "visibility": 10000,
            "wind_speed": 2.78,
            "wind_deg": 325,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596466800,
            "temp": 298.8,
            "feels_like": 299.66,
            "pressure": 1016,
            "humidity": 67,
            "dew_point": 292.22,
            "clouds": 11,
            "visibility": 10000,
            "wind_speed": 3.42,
            "wind_deg": 327,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0.02
        },
        {
            "dt": 1596470400,
            "temp": 300.57,
            "feels_like": 300.15,
            "pressure": 1017,
            "humidity": 53,
            "dew_point": 290.29,
            "clouds": 10,
            "visibility": 10000,
            "wind_speed": 3.99,
            "wind_deg": 326,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0.03
        },
        {
            "dt": 1596474000,
            "temp": 301.81,
            "feels_like": 300.71,
            "pressure": 1016,
            "humidity": 46,
            "dew_point": 289.1,
            "clouds": 8,
            "visibility": 10000,
            "wind_speed": 4.34,
            "wind_deg": 324,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0.07
        },
        {
            "dt": 1596477600,
            "temp": 302.85,
            "feels_like": 301.51,
            "pressure": 1016,
            "humidity": 42,
            "dew_point": 288.66,
            "clouds": 7,
            "visibility": 10000,
            "wind_speed": 4.43,
            "wind_deg": 327,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0.02
        },
        {
            "dt": 1596481200,
            "temp": 303.53,
            "feels_like": 302.32,
            "pressure": 1015,
            "humidity": 40,
            "dew_point": 288.55,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.17,
            "wind_deg": 330,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596484800,
            "temp": 304.1,
            "feels_like": 303.32,
            "pressure": 1015,
            "humidity": 39,
            "dew_point": 288.82,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.61,
            "wind_deg": 331,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596488400,
            "temp": 304.42,
            "feels_like": 303.9,
            "pressure": 1014,
            "humidity": 39,
            "dew_point": 289.09,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.39,
            "wind_deg": 323,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596492000,
            "temp": 304.3,
            "feels_like": 303.92,
            "pressure": 1013,
            "humidity": 41,
            "dew_point": 289.81,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.55,
            "wind_deg": 324,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596495600,
            "temp": 303.9,
            "feels_like": 305.16,
            "pressure": 1013,
            "humidity": 49,
            "dew_point": 292.03,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.68,
            "wind_deg": 328,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596499200,
            "temp": 301.88,
            "feels_like": 303.64,
            "pressure": 1014,
            "humidity": 56,
            "dew_point": 292.49,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.15,
            "wind_deg": 342,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596502800,
            "temp": 298.53,
            "feels_like": 299.77,
            "pressure": 1014,
            "humidity": 64,
            "dew_point": 291.26,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.26,
            "wind_deg": 350,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596506400,
            "temp": 297.14,
            "feels_like": 297.56,
            "pressure": 1014,
            "humidity": 63,
            "dew_point": 289.77,
            "clouds": 5,
            "visibility": 10000,
            "wind_speed": 2.52,
            "wind_deg": 343,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596510000,
            "temp": 296.33,
            "feels_like": 296.59,
            "pressure": 1015,
            "humidity": 66,
            "dew_point": 289.73,
            "clouds": 5,
            "visibility": 10000,
            "wind_speed": 2.72,
            "wind_deg": 348,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596513600,
            "temp": 295.56,
            "feels_like": 295.87,
            "pressure": 1015,
            "humidity": 70,
            "dew_point": 290.03,
            "clouds": 3,
            "visibility": 10000,
            "wind_speed": 2.76,
            "wind_deg": 356,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596517200,
            "temp": 295.03,
            "feels_like": 295.23,
            "pressure": 1015,
            "humidity": 72,
            "dew_point": 289.86,
            "clouds": 3,
            "visibility": 10000,
            "wind_speed": 2.88,
            "wind_deg": 358,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596520800,
            "temp": 294.31,
            "feels_like": 294.08,
            "pressure": 1015,
            "humidity": 74,
            "dew_point": 289.66,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 3.35,
            "wind_deg": 3,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596524400,
            "temp": 293.37,
            "feels_like": 293.31,
            "pressure": 1016,
            "humidity": 79,
            "dew_point": 289.64,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.17,
            "wind_deg": 360,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596528000,
            "temp": 292.67,
            "feels_like": 292.82,
            "pressure": 1015,
            "humidity": 82,
            "dew_point": 289.69,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.82,
            "wind_deg": 2,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596531600,
            "temp": 292.26,
            "feels_like": 292.63,
            "pressure": 1015,
            "humidity": 84,
            "dew_point": 289.67,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.5,
            "wind_deg": 2,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596535200,
            "temp": 291.89,
            "feels_like": 292.27,
            "pressure": 1015,
            "humidity": 86,
            "dew_point": 289.65,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.49,
            "wind_deg": 11,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596538800,
            "temp": 291.49,
            "feels_like": 291.76,
            "pressure": 1016,
            "humidity": 88,
            "dew_point": 289.59,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.63,
            "wind_deg": 25,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596542400,
            "temp": 291.45,
            "feels_like": 291.81,
            "pressure": 1016,
            "humidity": 90,
            "dew_point": 289.86,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.67,
            "wind_deg": 38,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596546000,
            "temp": 293.42,
            "feels_like": 293.51,
            "pressure": 1017,
            "humidity": 83,
            "dew_point": 290.61,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.43,
            "wind_deg": 51,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596549600,
            "temp": 295.05,
            "feels_like": 295.44,
            "pressure": 1017,
            "humidity": 78,
            "dew_point": 291.14,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.36,
            "wind_deg": 57,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596553200,
            "temp": 297.06,
            "feels_like": 298.16,
            "pressure": 1018,
            "humidity": 71,
            "dew_point": 291.57,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.62,
            "wind_deg": 49,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596556800,
            "temp": 298.82,
            "feels_like": 300.31,
            "pressure": 1018,
            "humidity": 65,
            "dew_point": 291.88,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.23,
            "wind_deg": 44,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596560400,
            "temp": 300.65,
            "feels_like": 302.63,
            "pressure": 1017,
            "humidity": 59,
            "dew_point": 292.02,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.64,
            "wind_deg": 30,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596564000,
            "temp": 302.15,
            "feels_like": 303.67,
            "pressure": 1017,
            "humidity": 50,
            "dew_point": 290.85,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.53,
            "wind_deg": 4,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596567600,
            "temp": 302.73,
            "feels_like": 303.43,
            "pressure": 1016,
            "humidity": 45,
            "dew_point": 289.72,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.04,
            "wind_deg": 15,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596571200,
            "temp": 303.13,
            "feels_like": 303.6,
            "pressure": 1016,
            "humidity": 43,
            "dew_point": 289.2,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.18,
            "wind_deg": 33,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596574800,
            "temp": 303.51,
            "feels_like": 304.03,
            "pressure": 1015,
            "humidity": 41,
            "dew_point": 289.09,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.88,
            "wind_deg": 38,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596578400,
            "temp": 303.6,
            "feels_like": 304.47,
            "pressure": 1014,
            "humidity": 42,
            "dew_point": 289.39,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.63,
            "wind_deg": 47,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596582000,
            "temp": 303.2,
            "feels_like": 304.67,
            "pressure": 1015,
            "humidity": 45,
            "dew_point": 290.23,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.18,
            "wind_deg": 70,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596585600,
            "temp": 301.6,
            "feels_like": 303.61,
            "pressure": 1015,
            "humidity": 55,
            "dew_point": 291.91,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.44,
            "wind_deg": 111,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596589200,
            "temp": 298.28,
            "feels_like": 299.45,
            "pressure": 1015,
            "humidity": 59,
            "dew_point": 289.93,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.46,
            "wind_deg": 135,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596592800,
            "temp": 297.05,
            "feels_like": 297.91,
            "pressure": 1015,
            "humidity": 58,
            "dew_point": 288.49,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.14,
            "wind_deg": 155,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596596400,
            "temp": 296.48,
            "feels_like": 297.25,
            "pressure": 1016,
            "humidity": 58,
            "dew_point": 287.99,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1,
            "wind_deg": 83,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596600000,
            "temp": 295.64,
            "feels_like": 295.66,
            "pressure": 1016,
            "humidity": 60,
            "dew_point": 287.55,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.94,
            "wind_deg": 61,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596603600,
            "temp": 294.87,
            "feels_like": 294.44,
            "pressure": 1016,
            "humidity": 60,
            "dew_point": 286.83,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.23,
            "wind_deg": 69,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596607200,
            "temp": 293.85,
            "feels_like": 292.9,
            "pressure": 1016,
            "humidity": 61,
            "dew_point": 286.29,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.65,
            "wind_deg": 79,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596610800,
            "temp": 293.19,
            "feels_like": 292.27,
            "pressure": 1016,
            "humidity": 67,
            "dew_point": 286.96,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.99,
            "wind_deg": 99,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596614400,
            "temp": 292.88,
            "feels_like": 292.29,
            "pressure": 1015,
            "humidity": 75,
            "dew_point": 288.47,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.24,
            "wind_deg": 110,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596618000,
            "temp": 292.61,
            "feels_like": 292.31,
            "pressure": 1015,
            "humidity": 79,
            "dew_point": 288.88,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.11,
            "wind_deg": 105,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1596621600,
            "temp": 292.22,
            "feels_like": 291.88,
            "pressure": 1016,
            "humidity": 80,
            "dew_point": 288.78,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.08,
            "wind_deg": 105,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        }
    ],
    "daily": [
        {
            "dt": 1596477600,
            "sunrise": 1596454228,
            "sunset": 1596503643,
            "temp": {
                "day": 302.25,
                "min": 293.54,
                "max": 304.33,
                "night": 294.31,
                "eve": 301.88,
                "morn": 293.54
            },
            "feels_like": {
                "day": 300.98,
                "night": 294.08,
                "eve": 303.64,
                "morn": 295.4
            },
            "pressure": 1016,
            "humidity": 44,
            "dew_point": 288.76,
            "wind_speed": 4.43,
            "wind_deg": 327,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 7,
            "pop": 0.2,
            "uvi": 9.97
        },
        {
            "dt": 1596564000,
            "sunrise": 1596540671,
            "sunset": 1596589990,
            "temp": {
                "day": 302.15,
                "min": 291.45,
                "max": 303.51,
                "night": 293.85,
                "eve": 301.6,
                "morn": 291.45
            },
            "feels_like": {
                "day": 303.67,
                "night": 292.9,
                "eve": 303.61,
                "morn": 291.81
            },
            "pressure": 1017,
            "humidity": 50,
            "dew_point": 290.85,
            "wind_speed": 1.53,
            "wind_deg": 4,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 0,
            "pop": 0,
            "uvi": 10.38
        },
        {
            "dt": 1596650400,
            "sunrise": 1596627115,
            "sunset": 1596676336,
            "temp": {
                "day": 302.42,
                "min": 291.87,
                "max": 302.42,
                "night": 294.01,
                "eve": 301.64,
                "morn": 291.87
            },
            "feels_like": {
                "day": 304.67,
                "night": 294.69,
                "eve": 304.46,
                "morn": 292.2
            },
            "pressure": 1017,
            "humidity": 56,
            "dew_point": 292.87,
            "wind_speed": 1.77,
            "wind_deg": 118,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 58,
            "pop": 0.83,
            "rain": 3.02,
            "uvi": 11.59
        },
        {
            "dt": 1596736800,
            "sunrise": 1596713558,
            "sunset": 1596762681,
            "temp": {
                "day": 302.01,
                "min": 292.65,
                "max": 305.09,
                "night": 297.65,
                "eve": 303.27,
                "morn": 292.65
            },
            "feels_like": {
                "day": 304.6,
                "night": 299.73,
                "eve": 307.13,
                "morn": 293.7
            },
            "pressure": 1017,
            "humidity": 64,
            "dew_point": 294.68,
            "wind_speed": 2.53,
            "wind_deg": 161,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 98,
            "pop": 0.94,
            "rain": 4.76,
            "uvi": 11.1
        },
        {
            "dt": 1596823200,
            "sunrise": 1596800001,
            "sunset": 1596849025,
            "temp": {
                "day": 306.06,
                "min": 295.48,
                "max": 307.81,
                "night": 298.53,
                "eve": 304.63,
                "morn": 295.48
            },
            "feels_like": {
                "day": 308.98,
                "night": 300.73,
                "eve": 308.58,
                "morn": 298.03
            },
            "pressure": 1017,
            "humidity": 53,
            "dew_point": 295.51,
            "wind_speed": 2.58,
            "wind_deg": 216,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 9,
            "pop": 0.53,
            "rain": 0.28,
            "uvi": 10.9
        },
        {
            "dt": 1596909600,
            "sunrise": 1596886444,
            "sunset": 1596935367,
            "temp": {
                "day": 306.55,
                "min": 296.55,
                "max": 307.82,
                "night": 298.47,
                "eve": 305.09,
                "morn": 296.55
            },
            "feels_like": {
                "day": 308.83,
                "night": 299.58,
                "eve": 308.56,
                "morn": 298.77
            },
            "pressure": 1018,
            "humidity": 49,
            "dew_point": 294.68,
            "wind_speed": 2.87,
            "wind_deg": 198,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": 19,
            "pop": 0,
            "uvi": 10.02
        },
        {
            "dt": 1596996000,
            "sunrise": 1596972887,
            "sunset": 1597021708,
            "temp": {
                "day": 306.68,
                "min": 296.15,
                "max": 307.86,
                "night": 298.9,
                "eve": 305.38,
                "morn": 296.15
            },
            "feels_like": {
                "day": 308.75,
                "night": 300.82,
                "eve": 309.05,
                "morn": 298.65
            },
            "pressure": 1017,
            "humidity": 49,
            "dew_point": 294.8,
            "wind_speed": 3.25,
            "wind_deg": 189,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 0,
            "pop": 0,
            "uvi": 10.5
        },
        {
            "dt": 1597082400,
            "sunrise": 1597059331,
            "sunset": 1597108049,
            "temp": {
                "day": 306.82,
                "min": 296.76,
                "max": 308.39,
                "night": 305.59,
                "eve": 305.59,
                "morn": 296.76
            },
            "feels_like": {
                "day": 308.65,
                "night": 308.52,
                "eve": 308.52,
                "morn": 299.93
            },
            "pressure": 1016,
            "humidity": 50,
            "dew_point": 295.27,
            "wind_speed": 3.93,
            "wind_deg": 215,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 0,
            "pop": 0.23,
            "uvi": 11.05
        }
    ]
}
