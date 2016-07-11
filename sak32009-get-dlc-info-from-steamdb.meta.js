// ==UserScript==
// @name             Get DLC Info from SteamDB
// @namespace        sak32009-get-dlc-info-from-steamdb
// @description      Get DLC Info from SteamDB.
// @author           Sak32009
// @contributor      CS.RIN.RU Users
// @version          1.9.3
// @license          MIT
// @homepageURL      https://github.com/Sak32009/GetDLCInfoFromSteamDB
// @supportURL       http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL        https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL      https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon             data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAFJklEQVRIx22VW4zV1RXGf9/e538OMwwMA0NFHWC4DhQGGKdempqmjFWwrY0JiaE0pZcovYSSNOpDExJqbExjME1r+0AN1VKJaZM2TaGpSoUmaiJEi0gFZwy2AkUME5BhDnNu//31YQ4j2q6Hnb0e1v371lI/7VSoR1HPRYjZUt2sfpYwmxm0UsTUGOUcJznm13ywfmLIiwgRQh6ooRtACq15Il+pr7JWS8i4WowJV77AIL/30wxJteCEtUohxJxb9GMNIAASRggQBsQlDuoEZSKzfCvXg/d6q4+kmJJ6VVB4VPcDiUS4Eq3pKnCKrWmPFzCDAmLMg4WMR1hP7ofbHroYdDvDu7WBBiLyUamT8bZvzuvxMR3nJUaUeQ7r0r7wOx7kUfCO4ne04mFtpUpAhGbiH5YR2MwveYRONlFIDQnTrWfdz2S9QyvyFvW+4j6KV7UsRwRAHGGzX0rELn7iF/0yoxToCl/RIe9kCz+jQYEhLSnoOvXQy0qWewHtgJFO64flpzO1UabNlVY+TbtyoKa3arW4TfciW/JoM+VuRiiGKZ1hnlZxwZc9w6f0/tCb3UKkFsmN5dzNFKarn1WIRCAROKaF1/jG+OrUcyEfZQ0/ZT4n6NDMazXfa9woPTRNZz+pe1ivxRNYMDmF8Vf3ahu/3cXXOMYbPqrDYZ8zK11WIHlReJxN3q3PICA5ASgQMGAC2/2gFil47Afa7qBE4AntYj5lyrRrXnqb7zFAjifwYRImWqr6u9mTiuqNWV7YWH1idKyC2oER3uC8kku0s4I26sQmoGE8uvxBS6GtWLzPuypR/eSPs1nob//a2Hqf19LHpHH80sSxJ2YsuMxh7RndueAZf97wi/h99d6v7VRdYj+3OYQ0fL1XssI9dNHJlCYbywxzSoMc0esj780NIfECA6pS8gNadpLZNCjwWtunzk5yrZECFcosI3IyOsNqzMwbnKGVgAkhFK+plF+lnwYFTmlJhVJzQGt4Pi/WXbcxpJDCRBF5IAiRKVOscYeea1ZV1aLXWUlOQFzwBj0rXSZEYdvGTVZLkkl5K8ncqd10YBKRI1pwl/9EkJut+gOPZYda0iVOfIyaC2lnLFZu5AHWYRAWSXerG33DTxolcgIR8xYv+CCDOssl1cBFpniWeriFAZYCOYnoIPRNnlJP0bV0e/prLcqIKmFipVUZpQqUaLvSJ+okStgq5uHOsE9F9ZGWFXZxw9jQhX/qrqaxyYE4sR0+qte8t2N5y2L+0dgY3lTvwnCALtCBfOB8dxrwavo8lzb+V0b1bw7rQNg//d2436uB02m1lu/hS1Qp8ffi6loYTWMQ6GS2r1Wnp1ICqhphmDOc5pw9mcmhmGoH+BxVSuzV0jEmkQicYenxkbmTqnUlW7z3sfCzAMmxWDhZWTqV41xHIlDR4ouaCuRE/4pvS7VgNdzAIH/IAYsCBcnFlKwd2kROBI9o4U6+RZ2MRPDzbPGgdNEFFYJ01XVxIzXcLpue8HPuIBGok/FrzZ/m57iJOgGI1PgLu/XyPWd38AkGm+Y9vM8XeGWWb2UDX6RIDiQyDmqt5hKn5b/xlzGmTqYALjPEIO8yzBjQwkzm0EOPWsGJOhlC+nP4evpA8wLkyeu8zb0YkZMrQ/9njHadSMRIR/Uj/TEGUDeIQJ5i47Os923MIzTPqEkyePzkjPtMvKP9PFN4MeaOJKw5CJEXnM6nDijlvb6JPhbT5Q5Ndgaqu6zz/IchDutQPEr1AtODQmwY819y11e0hd2kqgAAAABJRU5ErkJggg==
// @include          *//steamdb.info/app/*
// @grant            none
// @run-at           document-end
// @noframes
// ==/UserScript==
