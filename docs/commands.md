# Hub Client Toolkit Commands

Simple:

`hubc-cli <ACTION> ...`

Advanced:

`hubc-cli <ACTION> -h 127.0.0.1 -p 7778 -t 3000 ...`

### Store value(s)

Command:

`hubc-cli store <VALUE_NAME> <VALUE> [<VALUE_NAME> <VALUE>...]`

Output example:

```
> hubc-cli store Gas.Switch 1
Gas.Switch=1
```

### Retrieve value(s)

Command:

`hubc-cli retrieve <VALUE_NAME> [<VALUE_NAME>...]`

Output example:

```
> hubc-cli retrieve Gas.Concentration
Gas.Concentration=100
```

### List values

Command:

`hubc-cli list [<WILDCARD=*>]`

If the `WILDCARD` is not specified, the default one is applied - `*`.

Output example (shorted to 3 entries):

```
> hubc-cli list
Gas.Concentration=100
Gas.Switch=1
Gas.Power=225
...
```

### Listen to value(s) updates

Prints value(s) on update until SIGINT signal (or Ctrl+C) is received.

Command:

`hubc-cli listen <VALUE_NAME> [<VALUE_NAME>...]`

Output example (shorted to 3 entries):

```
> hubc-cli listen Gas.Concentration
Gas.Concentration=100
Gas.Concentration=96
Gas.Concentration=99
...
```

Command-specific parameters:

|Parameter|Description|
|---|---|
|`--limit=<COUNT>`|Receive the specified number of updates (in total), then exit.|
|`--no-names`|Print only value without its name.|
