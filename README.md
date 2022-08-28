# Message Reference
The following table describes the MIDI message types that are supported and the parameters of each:

| Type               | Parameter          | Parameter        | Parameter      |
|--------------------|--------------------|------------------|----------------|
| noteon             | note [0-127]       | velocity [0-127] | channel [0-15] |
| noteoff            | note [0-127]       | velocity [0-127] | channel [0-15] |
| cc                 | controller [0-127] | value [0-127]    | channel [0-15] |

# Examples

Send a noteon message enter the annotations area and send noteoff message exit the annotations area:

```javascript
noteon:37:80:0|noteoff:37:80:0
```

Send a control change enter the annotations area and send control change message exit the annotations area:

```javascript
cc:37:80:0|cc:37:80:0
```

If you wanna sent data only when cursor enter the annotations area then

```javascript
cc:37:80:0
```