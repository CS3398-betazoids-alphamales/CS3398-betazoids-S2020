'use strict';

let ingrArray = [];
let negIngrArray = [];
let lmMultiPage = 1;


(function(angular){

    var allIngredients =["everclear","nails","tree bark","rum","lime juice","simple syrup","grenadine","coconut rum","melon liqueur","orange juice","pineapple juice","early times","apricot brandy","club soda","scotch","coffee liqueur","half & half","orange brandy liqueur","amaretto","vodka","cranberry juice","grapefruit juice","southern comfort","grand marnier","amaretto di saronno","gin or vodka","dry vermouth","creme de noya","white creme de menthe","blue curacao","jack daniels","7up","galliano","harveys bristol cream","dubonnet","finlandia vodka","gold tequila","triple sec","margarita mix","ice","irish cream","gin","sweet & sour mix","apple cider","lemon juice","peppermint schnapps","asti spumante wine","lemon","bourbon","pepe lopez tequila","tequila","water","salt","gold rum","banana liqueur","sloe gin","dark rum","tia maria","milk","espresso shot","cream of coconut","chocolate syrup","vanilla ice cream","creme de almond","lemonade","orange spice tea bag","canadian mist","pina colada mix","brandy","irish whiskey","coffee","sour mix","campari","sweet vermouth","dark creme de cacao","ground cinnamon","apple","apple juice","honey","apricot liqueur","cherry brandy","midori","whipped cream","bombay gin","hazelnut liqueur","banana","vanilla syrup","white creme de cacao","bar sugar","bananas","nutmeg","pureed strawberries","strawberry liqueur","pecans","peach schnapps","orange sherbet","kirsch","orange bitters","creme de noyaux","sugar","hot coffee","korbel spiced brandy","roses sweetened lime juice","limeade concentrate","beer","cinnamon stick","lemon peel","hot cider","green creme de menthe","oreo cookies","ginger ale","lime wedge","lemon wedge","pepper sauce","skyy vodka","passion fruit liqueur","peach","blueberries","raspberry liqueur","blackberry brandy","lillet","light rum","skyy citrus","tonic water","hot chocolate","cherry","chocolate chips","chocolate ice cream","bitters","black sambuca","raspberries","mentholmint schnapps","beef broth","bloody mary mix","maple syrup","tomato juice","spiced rum","plain yogurt","blueberries with juice","grape juice","korbel brandy","white creme de cocoa","vanilla extract","lime juce","creme de banana","orange pekoe tea","dark jamaica rum","tabasco sauce","salt & pepper","worcestershire sauce","iced tea","butterscotch schnapps","tuaca","sugar syrup","praline or pecan liqueur","chocolate mint liqueur","cocktail orange syrup","maraschino cherries","cloves","maraschino cherry juice","metaxa","orange wedge","cinnamon schnapps","red apple","creme de cacao","cherry 7up","brown cacao","chablis","creme de cassis","benedictine","amer picon","egg whites","maraschino cherry","champagne","granulated sugar","peychaud bitters","korbel champagne","malt","hersheys syrup","cherry liqueur","scotch liqueur","whipping cream","brown sugar","semisweet chocolate squares","creme de cocoa","dark creme de cocoa","peppermint liqueur","lime","orange","sprite","cointreau","roses lime juice","midori melon liqueur","collins mix","irish mist","lemon twist","barspoon hot buttered rum mix","liqueur","hot cappuccino","hot black coffee","liquore galliano","golden rum","strawberries","cutty sark scots whisky","cola","irish whisky","kirschwasser","peter heering","danish vodka","dark cocoa","coco lopez","cream","ushers scotch","dubonnet rouge","dairy eggnog","ground nutmeg","eggnog","blue jello","coke","almond syrup","cognac","lemonlime soda","curacao","apple juice concentrate","coffee ice cream","vanilla","orange juice concentrate","sambuca","cinnamon","red wine","b & b","oranges","green chartreuse","apple schnapps","citrus soda","pineapple ring","blackberry liqueur","anisette","pernod","jaegermeister","peaches","eagle sweetened condensed","almond extract","eggs","banana liquour","hot chocolate or chocolate syrup","hot buttered rum mix","hot apple juice","hot cranberry juice","barspoon hot buttered rum batter","cherry syrup","frangelico","hot water","cherry marnier liqueur","dried cranberries","passion nectar","orange curacao","ouzo","stolichnaya","cuervo","beefeater","coffee brandy","anisette liqueur","peach brandy","baileys irish cream","lillehammer","chambord liqueur","limeade concentrat","blueberry schnapps","port wine","pineapple","cherry pucker","strega","cranberry","oblio sambuca","coffee bean","lime sherbet","egg","madeira","angostura bitters","old forester bourbon","stawberry liqueur","strawberry","egg white","mint sprig","twist lemon","hot tea","condensed milk","chocolate liqueur","banana liqeuer","blueberry brandy","ginger beer","yukon jack","apple jack","metexa","soda","campari liquor","orgeat","hot apple cider","squirt lemon juice","peaches in syrup","peppered vodka","orange sherbert","gentleman jack","pimms cup","pineapple syrup","cranberry sauce","pink lemonade","concentrated lime juice","early times inst pussycat mix","cold water","maraschino liqueur","orange flower water","vanilla liqueur","red curacao","burgundy","cherry juice","root beer schnapps","drambuie","rye","lime sour mix","apple brandy","white tequila","sake","watermelon","red bull","orange liqueur","sweetened lime juice","bombay sapphire","limes","sour lime juice","boiling water","tea bags","light corn syrup","licor","banana korbel brandy","blackberry korbel brandy","banana daiquiri mix","citrus gatorade","sparkling water","angostura bitter","tangerine juice","cherry korbel brandy","carys pure maple syrup","citrus vodka","unsweetened tea","spearmint schnapps","bar sour","orange peel","papaya juice","tangerine liqueur","aquavit","peach nectar","cocoa","clovestudded oranges","wild turkey","rose or burgundy","slivovitz"]

    var app = angular.module('mainModule', ['chips']);
  
  app.controller('mainController',mainController);

  function mainController($filter){
    let self = this;

      init();

    function init(){
       self.positiveItems = [];
       self.negativeItems = [];
       self.insert = '';
    }

    self.add = add;
    self.negate = negate;
    self.closePos = closePos;
    self.closeNeg = closeNeg;

   function add(input){
       let exists = allIngredients.includes(self.insert);
       console.log(exists);
       if(self.positiveItems.indexOf(input) === -1
            && self.insert !== '' && exists){
          self.positiveItems.push(input);
          self.insert = '';
          ingrArray=this.positiveItems;
       } else {
       }
    }

    function negate(input){
        let exists = allIngredients.includes(self.insert);
        if(self.negativeItems.indexOf(input) === -1
            && self.insert !== '' && exists){
          self.negativeItems.push(input);
          self.insert = '';
          negIngrArray=this.negativeItems;
       } else {
        }
    }

    function closePos(text){
      self.positiveItems = $filter('filter')(self.positiveItems, function(value){
        return value != text;
      });
      ingrArray=this.positiveItems;
    }

    function closeNeg(text){
      self.negativeItems = $filter('filter')(self.negativeItems, function(value){
        return value != text;
      });
      negIngrArray=this.negativeItems;
    }
  }

})(window.angular);

$("#multi-search").click(function(){
	panelPurge();
	lmMultiPage = 1;
    multiSearch(lmMultiPage);
});

function multiSearch(lmMultiPage) {
	let page = lmMultiPage;

    var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/' +
        'getByIngredientStrict?page=' + page + '&total=' + ingrArray.length;

    for (let i = 0; i < ingrArray.length; i++) {
        let ingredient = '&findthis' + [i + 1] + '=' + ingrArray[i].toString().replace(/ /g, '+');
        targetUrl = targetUrl.concat(ingredient);
    }
    for (let i = 0; i < negIngrArray.length; i++) {
        let ingredient = '&not' + [i + 1] + '=' + negIngrArray[i].toString().replace(/ /g, '+');
        targetUrl = targetUrl.concat(ingredient);
    }
    console.log(targetUrl);

    loadPanel(String(targetUrl), "multi", null, page);
}



