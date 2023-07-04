# testexpogmaps

1. `npm install`
1. Reproduce slowness problem:
   ```
   npm run web
   ```
1. Then, `Ctrl^C` and restart with legacy markers and slowness goes away:
   ```
   LEGACY=true npm run web
   ```
