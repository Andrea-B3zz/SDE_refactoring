echo "Cloning the repo in the current folder"
git clone https://github.com/HZ-OOP-2324/oop-team01.git
echo "Installing npm package"
npm install
echo "Choose which mode would you like to use Build mode(B) or Watch mode(W): "
read CHOICE
if test "$CHOICE" = "B"
then 
npm run build
else if test "$CHOICE" = "W"
then 
npm run watch
