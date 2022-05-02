# Scenario JSON Schema

## Introduction

This file describes the schema used to represent our scenario data in JSON
usinga hybrid syntax between the standard ABNF defined in
[RFC 5234](https://datatracker.ietf.org/doc/html/rfc5234) and updated in
[RFC 7405](https://datatracker.ietf.org/doc/html/rfc7405), and JSON syntax as
defined in the [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259). This
syntax has the same rule as ABNF, apart from the following updates:
- Unquoted curly brackets `{}` mark the start and end of a JSON object, and
  everything in between matching curly brackets represents a JSON object, and
  as such obeys standard JSON syntax. ABNF takes over again immediately after
  the closing curly bracket `}`.
- Unquoted square brackets `[]` mark the start and end of a JSON array, and
  everything in between matching square brackets MUST represents a JSON value,
  and as such obeys standard JSON syntax. ABNF takes over again immediately
  after the closing square bracket `]`
- Optional grammar element written in ABNF may not be written using unquoted
  square brackets `[]`, as they are now reserved for JSON array syntax.

Text in-between angle brackets in JSON strings refers to an other ABNF rule.

> For example, `ack = { "token": "<token>" }` defines a rule named `ack`
> representing a JSON object with a mandatory field `token` which is a JSON
> string with syntax defined by the \<token> rule.

Any non-valid JSON syntax inside a JSON object or array is considered ABNF
syntax.

> For example, `player = { "name": "alex" *1( , "eyes": "blue" )}` defines a
> rule named `player` representing a JSON object with a mandatory `name` field
> and an optional `eyes` field.

Reference to grammar definitions in text is made by using the definition name's
in between unquoted angle brackets `<>`, as it's common to do when dealing with
ABNF grammar definitions.

> For instance, \<color> refers to the generic definition `color = "#"
> 6HEXDIG`.

## Schema

```
scenario  = {
             "steps": { "<id>": step *("," "<id>" step) }
            }
step      = {
              "text": "<text>",
              "choices": [ 1*choice ]
            }
choice    = {
              "text": "<text>",
              "next": "<id>"
            }
id = 1*DIGIT
```

> Example:
> ```json
> {
>   "steps": {
>     "1": {
>       "text": "bla",
>       "choices": [
>         { "text": "foo", "next": 2 }
>         { "text": "END", "next": 0 }
>       ]
>     },
>     "2" : {
>       "text": "blu",
>       "choices": [
>         { "text": "bar", "next": 1 }
>         { "text": "END", "next": 0 }
>       ]
>     }
>   }
> }
> ```
