# fix_fbjson

This program converts facebook's string encoding in JSON to plain UTF-8.

## Weird Facebook's string encoding in JSON

### String encoding in Facebook's JSON

Strings are weirdly encoded in a JSON file downloaded from facebook's "Download your information".

* Code for Korean letter `각`
  > U+AC01

* bits for `AC01`
  > 1010 1100 0000 0001

* UTF-8 encoded `AC01`:
  > `1110` 1010 = EA
  >
  > `10`11 0000 = B0
  >
  > `10`00 0001 = 81

* string in JSON: `\u00ea\u00b0\u0081`

### Why is this weird?

According to [The JSON Data Interchange Syntax][json_spec]:

> If the code point is in the Basic Multilingual Plane (U+0000 through U+FFFF), then it may be represented as a six-character sequence: a reverse solidus, followed by the lowercase letter u, followed by four hexadecimal digits that encode the code point.

This implies that `\u00ea` in string should be decoded as `00 EA` instead of `EA`.

## Reference

* [The JSON Data Interchange Syntax][json_spec]
* [Wikipedia: UTF-8][wikipedia_utf_8]
* [Unicode: Hangul Syllables / Range: AC00–D7AF][unicode_korean_hangul]

[json_spec]: <http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf>

[wikipedia_utf_8]: <https://en.wikipedia.org/wiki/UTF-8>

[unicode_korean_hangul]: <https://www.unicode.org/charts/PDF/UAC00.pdf>

