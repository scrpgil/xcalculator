rm -rf browser/*
ionic cordova build browser --prod
cp -rf lab browser/
cp -rf platforms/browser/www/* browser
cd browser
git init
git add . 
git commit -m "auto deploy" 
git branch gh-pages 
git checkout gh-pages 
git remote add origin https://github.com/scrpgil/xcalculator.git
git push -f origin gh-pages
