# informations : 

1 - créer un .env à la racine du client et y mettre la clef api pinata + secret

2 - l'upload se passe en 2 étapes :

a) au moment ou l'image est ajoutée, on la pin avec "PinFileToIPFS.js" et on recupere le cid de l'image
b) on crée notre json (pour le moment seule la clef image des metadonnées est modulable, il faudra modifier postJson pour le faire correspondre à notre modèle de données) et on l'upload avec "postJsonBody.js" 

3- on mint le nft en lui donnant l'uri retourné par postJsonBody.js
