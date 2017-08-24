ionic cordova build browser --prod
cd platforms/browser/www
git init
git add . 
git commit -m "auto deploy" 
git branch gh-pages 
git checkout gh-pages 
git remote add origin https://github.com/scrpgil/xcalculator.git
git push -f origin gh-pages
