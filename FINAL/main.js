// Will be used to the save the loaded JSON data
var allData = [];
var defaultGates = ["Entrances", "Ranger Stops", "General Gates", "Gates", "Camping"];
var defaultCars = ["2 Axle Car", "2 Axle Truck", "Ranger Vehicle", "3 Axle Truck", "4 Axle Truck", "2 Axle Bus", "3 Axle Bus"]

// Date parser to convert strings to date objects
var parseDate = d3.timeParse("%Y");

// Set ordinal color scale
var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

// Variables for the visualization instances
var areachart, timeline, bubbleplot;


// Start application by loading the data
jsonData = {"months":[{"Month":01,"Cars":1271},{"Month":02,"Cars":2815},{"Month":03,"Cars":4293},{"Month":04,"Cars":3643},{"Month":05,"Cars":2646},{"Month":06,"Cars":1002},{"Month":07,"Cars":382},{"Month":08,"Cars":231},{"Month":09,"Cars":233},{"Month":10,"Cars":495},{"Month":11,"Cars":524},{"Month":12,"Cars":613},{"Month":13,"Cars":1342}],"layers":[{"Month":1,"2 Axle Car":439,"2 Axle Truck":341,"Ranger Vehicle":96,"3 Axle Truck":190,"4 Axle Truck":112,"2 Axle Bus":68,"3 Axle Bus":25,"2 Axle Car Ranger Stops":281,"2 Axle Truck Ranger Stops":210,"3 Axle Truck Ranger Stops":112,"4 Axle Truck Ranger Stops":67,"2 Axle Bus Ranger Stops":40,"3 Axle Bus Ranger Stops":13,"Ranger Vehicle Ranger Stop":94,"2 Axle Car Entrances":439,"2 Axle Truck Entrances":341,"3 Axle Truck Entrances":190,"4 Axle Truck Entrances":112,"2 Axle Bus Entrances":68,"3 Axle Bus Entrances":25,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":2,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":96,"2 Axle Car General Gates":383,"2 Axle Truck General Gates":290,"3 Axle Truck General Gates":161,"4 Axle Truck General Gates":91,"2 Axle Bus General Gates":56,"3 Axle Bus General Gates":19,"Ranger Vehicle General Gates":90,"2 Axle Car Camping":216,"2 Axle Truck Camping":124,"3 Axle Truck Camping":75,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":52,"entrance 0":449,"entrance 1":425,"entrance 2":451,"entrance 3":484,"entrance 4":424,"ranger-stop 0":766,"ranger-stop 1":24,"ranger-stop 2":762,"ranger-stop 3":50,"ranger-stop 4":35,"ranger-stop 5":39,"ranger-stop 6":77,"ranger-stop 7":33,"gate 0":11,"gate 1":11,"gate 2":24,"gate 3":50,"gate 4":39,"gate 5":77,"gate 6":58,"gate 7":33,"gate 8":96,"general gate 0":7,"general gate 1":760,"general gate 2":765,"general gate 3":46,"general gate 4":496,"general gate 5":462,"general gate 6":43,"general gate 7":647,"camping 0":36,"camping 1":7,"camping 2":56,"camping 3":61,"camping 4":49,"camping 5":69,"camping 6":60,"camping 7":43,"camping 8":94},{"Month":2,"2 Axle Car":1229,"2 Axle Truck":769,"Ranger Vehicle":78,"3 Axle Truck":480,"4 Axle Truck":119,"2 Axle Bus":81,"3 Axle Bus":59,"2 Axle Car Ranger Stops":827,"2 Axle Truck Ranger Stops":503,"3 Axle Truck Ranger Stops":306,"4 Axle Truck Ranger Stops":67,"2 Axle Bus Ranger Stops":51,"3 Axle Bus Ranger Stops":34,"Ranger Vehicle Ranger Stop":77,"2 Axle Car Entrances":1229,"2 Axle Truck Entrances":769,"3 Axle Truck Entrances":480,"4 Axle Truck Entrances":119,"2 Axle Bus Entrances":81,"3 Axle Bus Entrances":59,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":3,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":78,"2 Axle Car General Gates":1131,"2 Axle Truck General Gates":694,"3 Axle Truck General Gates":432,"4 Axle Truck General Gates":96,"2 Axle Bus General Gates":64,"3 Axle Bus General Gates":52,"Ranger Vehicle General Gates":76,"2 Axle Car Camping":958,"2 Axle Truck Camping":530,"3 Axle Truck Camping":334,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":50,"entrance 0":924,"entrance 1":890,"entrance 2":970,"entrance 3":1195,"entrance 4":994,"ranger-stop 0":1815,"ranger-stop 1":20,"ranger-stop 2":1813,"ranger-stop 3":53,"ranger-stop 4":25,"ranger-stop 5":42,"ranger-stop 6":66,"ranger-stop 7":30,"gate 0":5,"gate 1":5,"gate 2":20,"gate 3":53,"gate 4":42,"gate 5":66,"gate 6":48,"gate 7":30,"gate 8":78,"general gate 0":28,"general gate 1":1812,"general gate 2":1815,"general gate 3":116,"general gate 4":1378,"general gate 5":1151,"general gate 6":184,"general gate 7":1700,"camping 0":155,"camping 1":31,"camping 2":203,"camping 3":225,"camping 4":252,"camping 5":306,"camping 6":233,"camping 7":184,"camping 8":296},{"Month":3,"2 Axle Car":1962,"2 Axle Truck":1137,"Ranger Vehicle":69,"3 Axle Truck":774,"4 Axle Truck":171,"2 Axle Bus":129,"3 Axle Bus":51,"2 Axle Car Ranger Stops":1322,"2 Axle Truck Ranger Stops":801,"3 Axle Truck Ranger Stops":525,"4 Axle Truck Ranger Stops":102,"2 Axle Bus Ranger Stops":82,"3 Axle Bus Ranger Stops":33,"Ranger Vehicle Ranger Stop":67,"2 Axle Car Entrances":1961,"2 Axle Truck Entrances":1137,"3 Axle Truck Entrances":774,"4 Axle Truck Entrances":171,"2 Axle Bus Entrances":129,"3 Axle Bus Entrances":51,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":3,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":69,"2 Axle Car General Gates":1829,"2 Axle Truck General Gates":1060,"3 Axle Truck General Gates":719,"4 Axle Truck General Gates":143,"2 Axle Bus General Gates":107,"3 Axle Bus General Gates":40,"Ranger Vehicle General Gates":66,"2 Axle Car Camping":1634,"2 Axle Truck Camping":869,"3 Axle Truck Camping":619,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":42,"entrance 0":1380,"entrance 1":1303,"entrance 2":1558,"entrance 3":1779,"entrance 4":1498,"ranger-stop 0":2878,"ranger-stop 1":20,"ranger-stop 2":2875,"ranger-stop 3":41,"ranger-stop 4":20,"ranger-stop 5":28,"ranger-stop 6":60,"ranger-stop 7":24,"gate 0":5,"gate 1":5,"gate 2":14,"gate 3":41,"gate 4":28,"gate 5":60,"gate 6":44,"gate 7":24,"gate 8":69,"general gate 0":41,"general gate 1":2873,"general gate 2":2877,"general gate 3":173,"general gate 4":2268,"general gate 5":1767,"general gate 6":323,"general gate 7":2728,"camping 0":260,"camping 1":49,"camping 2":374,"camping 3":335,"camping 4":443,"camping 5":538,"camping 6":354,"camping 7":321,"camping 8":506},{"Month":4,"2 Axle Car":1704,"2 Axle Truck":915,"Ranger Vehicle":74,"3 Axle Truck":614,"4 Axle Truck":186,"2 Axle Bus":110,"3 Axle Bus":40,"2 Axle Car Ranger Stops":1113,"2 Axle Truck Ranger Stops":595,"3 Axle Truck Ranger Stops":423,"4 Axle Truck Ranger Stops":112,"2 Axle Bus Ranger Stops":68,"3 Axle Bus Ranger Stops":21,"Ranger Vehicle Ranger Stop":74,"2 Axle Car Entrances":1703,"2 Axle Truck Entrances":915,"3 Axle Truck Entrances":614,"4 Axle Truck Entrances":186,"2 Axle Bus Entrances":110,"3 Axle Bus Entrances":40,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":2,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":74,"2 Axle Car General Gates":1570,"2 Axle Truck General Gates":836,"3 Axle Truck General Gates":565,"4 Axle Truck General Gates":148,"2 Axle Bus General Gates":91,"3 Axle Bus General Gates":29,"Ranger Vehicle General Gates":72,"2 Axle Car Camping":1371,"2 Axle Truck Camping":641,"3 Axle Truck Camping":452,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":45,"entrance 0":1163,"entrance 1":1086,"entrance 2":1253,"entrance 3":1572,"entrance 4":1230,"ranger-stop 0":2360,"ranger-stop 1":16,"ranger-stop 2":2357,"ranger-stop 3":48,"ranger-stop 4":25,"ranger-stop 5":32,"ranger-stop 6":62,"ranger-stop 7":23,"gate 0":6,"gate 1":6,"gate 2":16,"gate 3":48,"gate 4":32,"gate 5":62,"gate 6":46,"gate 7":23,"gate 8":74,"general gate 0":30,"general gate 1":2355,"general gate 2":2360,"general gate 3":144,"general gate 4":1777,"general gate 5":1439,"general gate 6":263,"general gate 7":2197,"camping 0":176,"camping 1":35,"camping 2":276,"camping 3":306,"camping 4":361,"camping 5":405,"camping 6":289,"camping 7":263,"camping 8":407},{"Month":5,"2 Axle Car":1112,"2 Axle Truck":716,"Ranger Vehicle":71,"3 Axle Truck":467,"4 Axle Truck":136,"2 Axle Bus":89,"3 Axle Bus":55,"2 Axle Car Ranger Stops":745,"2 Axle Truck Ranger Stops":463,"3 Axle Truck Ranger Stops":318,"4 Axle Truck Ranger Stops":83,"2 Axle Bus Ranger Stops":57,"3 Axle Bus Ranger Stops":35,"Ranger Vehicle Ranger Stop":70,"2 Axle Car Entrances":1111,"2 Axle Truck Entrances":716,"3 Axle Truck Entrances":467,"4 Axle Truck Entrances":136,"2 Axle Bus Entrances":89,"3 Axle Bus Entrances":55,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":2,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":71,"2 Axle Car General Gates":1032,"2 Axle Truck General Gates":651,"3 Axle Truck General Gates":434,"4 Axle Truck General Gates":114,"2 Axle Bus General Gates":72,"3 Axle Bus General Gates":44,"Ranger Vehicle General Gates":68,"2 Axle Car Camping":845,"2 Axle Truck Camping":474,"3 Axle Truck Camping":328,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":42,"entrance 0":859,"entrance 1":837,"entrance 2":896,"entrance 3":1098,"entrance 4":880,"ranger-stop 0":1723,"ranger-stop 1":17,"ranger-stop 2":1721,"ranger-stop 3":45,"ranger-stop 4":23,"ranger-stop 5":32,"ranger-stop 6":58,"ranger-stop 7":25,"gate 0":3,"gate 1":3,"gate 2":17,"gate 3":45,"gate 4":32,"gate 5":58,"gate 6":42,"gate 7":25,"gate 8":71,"general gate 0":24,"general gate 1":1719,"general gate 2":1722,"general gate 3":83,"general gate 4":1320,"general gate 5":1035,"general gate 6":186,"general gate 7":1622,"camping 0":122,"camping 1":26,"camping 2":207,"camping 3":198,"camping 4":238,"camping 5":284,"camping 6":186,"camping 7":186,"camping 8":251},{"Month":6,"2 Axle Car":329,"2 Axle Truck":253,"Ranger Vehicle":75,"3 Axle Truck":162,"4 Axle Truck":94,"2 Axle Bus":57,"3 Axle Bus":32,"2 Axle Car Ranger Stops":207,"2 Axle Truck Ranger Stops":161,"3 Axle Truck Ranger Stops":112,"4 Axle Truck Ranger Stops":60,"2 Axle Bus Ranger Stops":32,"3 Axle Bus Ranger Stops":21,"Ranger Vehicle Ranger Stop":72,"2 Axle Car Entrances":328,"2 Axle Truck Entrances":253,"3 Axle Truck Entrances":162,"4 Axle Truck Entrances":94,"2 Axle Bus Entrances":57,"3 Axle Bus Entrances":32,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":2,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":75,"2 Axle Car General Gates":288,"2 Axle Truck General Gates":210,"3 Axle Truck General Gates":142,"4 Axle Truck General Gates":78,"2 Axle Bus General Gates":48,"3 Axle Bus General Gates":26,"Ranger Vehicle General Gates":72,"2 Axle Car Camping":183,"2 Axle Truck Camping":103,"3 Axle Truck Camping":65,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":50,"entrance 0":311,"entrance 1":301,"entrance 2":337,"entrance 3":378,"entrance 4":349,"ranger-stop 0":620,"ranger-stop 1":15,"ranger-stop 2":618,"ranger-stop 3":54,"ranger-stop 4":26,"ranger-stop 5":41,"ranger-stop 6":64,"ranger-stop 7":21,"gate 0":4,"gate 1":4,"gate 2":15,"gate 3":54,"gate 4":41,"gate 5":64,"gate 6":38,"gate 7":21,"gate 8":75,"general gate 0":7,"general gate 1":617,"general gate 2":620,"general gate 3":52,"general gate 4":376,"general gate 5":407,"general gate 6":42,"general gate 7":479,"camping 0":34,"camping 1":8,"camping 2":45,"camping 3":51,"camping 4":42,"camping 5":44,"camping 6":55,"camping 7":42,"camping 8":83},{"Month":7,"2 Axle Car":84,"2 Axle Truck":80,"Ranger Vehicle":84,"3 Axle Truck":50,"4 Axle Truck":41,"2 Axle Bus":25,"3 Axle Bus":18,"2 Axle Car Ranger Stops":58,"2 Axle Truck Ranger Stops":50,"3 Axle Truck Ranger Stops":32,"4 Axle Truck Ranger Stops":31,"2 Axle Bus Ranger Stops":12,"3 Axle Bus Ranger Stops":10,"Ranger Vehicle Ranger Stop":82,"2 Axle Car Entrances":83,"2 Axle Truck Entrances":80,"3 Axle Truck Entrances":50,"4 Axle Truck Entrances":41,"2 Axle Bus Entrances":25,"3 Axle Bus Entrances":18,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":1,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":84,"2 Axle Car General Gates":75,"2 Axle Truck General Gates":70,"3 Axle Truck General Gates":41,"4 Axle Truck General Gates":37,"2 Axle Bus General Gates":20,"3 Axle Bus General Gates":14,"Ranger Vehicle General Gates":81,"2 Axle Car Camping":10,"2 Axle Truck Camping":12,"3 Axle Truck Camping":13,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":56,"entrance 0":118,"entrance 1":112,"entrance 2":122,"entrance 3":120,"entrance 4":111,"ranger-stop 0":222,"ranger-stop 1":19,"ranger-stop 2":219,"ranger-stop 3":49,"ranger-stop 4":27,"ranger-stop 5":38,"ranger-stop 6":65,"ranger-stop 7":29,"gate 0":9,"gate 1":9,"gate 2":19,"gate 3":49,"gate 4":38,"gate 5":65,"gate 6":51,"gate 7":29,"gate 8":84,"general gate 0":2,"general gate 1":216,"general gate 2":222,"general gate 3":30,"general gate 4":117,"general gate 5":159,"general gate 6":11,"general gate 7":166,"camping 0":8,"camping 1":4,"camping 2":4,"camping 3":13,"camping 4":5,"camping 5":7,"camping 6":8,"camping 7":11,"camping 8":40},{"Month":8,"2 Axle Car":49,"2 Axle Truck":40,"Ranger Vehicle":75,"3 Axle Truck":27,"4 Axle Truck":16,"2 Axle Bus":12,"3 Axle Bus":12,"2 Axle Car Ranger Stops":27,"2 Axle Truck Ranger Stops":19,"3 Axle Truck Ranger Stops":15,"4 Axle Truck Ranger Stops":10,"2 Axle Bus Ranger Stops":7,"3 Axle Bus Ranger Stops":7,"Ranger Vehicle Ranger Stop":75,"2 Axle Car Entrances":48,"2 Axle Truck Entrances":40,"3 Axle Truck Entrances":27,"4 Axle Truck Entrances":16,"2 Axle Bus Entrances":12,"3 Axle Bus Entrances":12,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":2,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":75,"2 Axle Car General Gates":40,"2 Axle Truck General Gates":30,"3 Axle Truck General Gates":24,"4 Axle Truck General Gates":13,"2 Axle Bus General Gates":12,"3 Axle Bus General Gates":10,"Ranger Vehicle General Gates":71,"2 Axle Car Camping":10,"2 Axle Truck Camping":13,"3 Axle Truck Camping":10,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":52,"entrance 0":61,"entrance 1":64,"entrance 2":61,"entrance 3":64,"entrance 4":46,"ranger-stop 0":111,"ranger-stop 1":16,"ranger-stop 2":111,"ranger-stop 3":49,"ranger-stop 4":24,"ranger-stop 5":38,"ranger-stop 6":65,"ranger-stop 7":27,"gate 0":10,"gate 1":10,"gate 2":16,"gate 3":49,"gate 4":38,"gate 5":65,"gate 6":45,"gate 7":27,"gate 8":75,"general gate 0":0,"general gate 1":108,"general gate 2":111,"general gate 3":32,"general gate 4":75,"general gate 5":99,"general gate 6":7,"general gate 7":112,"camping 0":8,"camping 1":0,"camping 2":6,"camping 3":10,"camping 4":11,"camping 5":4,"camping 6":7,"camping 7":7,"camping 8":40},{"Month":9,"2 Axle Car":46,"2 Axle Truck":37,"Ranger Vehicle":86,"3 Axle Truck":26,"4 Axle Truck":22,"2 Axle Bus":7,"3 Axle Bus":9,"2 Axle Car Ranger Stops":30,"2 Axle Truck Ranger Stops":19,"3 Axle Truck Ranger Stops":17,"4 Axle Truck Ranger Stops":11,"2 Axle Bus Ranger Stops":3,"3 Axle Bus Ranger Stops":4,"Ranger Vehicle Ranger Stop":83,"2 Axle Car Entrances":45,"2 Axle Truck Entrances":37,"3 Axle Truck Entrances":26,"4 Axle Truck Entrances":22,"2 Axle Bus Entrances":7,"3 Axle Bus Entrances":9,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":1,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":86,"2 Axle Car General Gates":37,"2 Axle Truck General Gates":29,"3 Axle Truck General Gates":23,"4 Axle Truck General Gates":18,"2 Axle Bus General Gates":4,"3 Axle Bus General Gates":8,"Ranger Vehicle General Gates":83,"2 Axle Car Camping":11,"2 Axle Truck Camping":14,"3 Axle Truck Camping":7,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":53,"entrance 0":61,"entrance 1":54,"entrance 2":52,"entrance 3":64,"entrance 4":52,"ranger-stop 0":115,"ranger-stop 1":21,"ranger-stop 2":113,"ranger-stop 3":56,"ranger-stop 4":24,"ranger-stop 5":43,"ranger-stop 6":74,"ranger-stop 7":29,"gate 0":4,"gate 1":4,"gate 2":21,"gate 3":56,"gate 4":43,"gate 5":74,"gate 6":50,"gate 7":29,"gate 8":86,"general gate 0":1,"general gate 1":110,"general gate 2":115,"general gate 3":36,"general gate 4":70,"general gate 5":124,"general gate 6":12,"general gate 7":103,"camping 0":2,"camping 1":1,"camping 2":4,"camping 3":7,"camping 4":7,"camping 5":6,"camping 6":11,"camping 7":12,"camping 8":40},{"Month":10,"2 Axle Car":129,"2 Axle Truck":93,"Ranger Vehicle":69,"3 Axle Truck":70,"4 Axle Truck":66,"2 Axle Bus":48,"3 Axle Bus":20,"2 Axle Car Ranger Stops":75,"2 Axle Truck Ranger Stops":60,"3 Axle Truck Ranger Stops":52,"4 Axle Truck Ranger Stops":41,"2 Axle Bus Ranger Stops":30,"3 Axle Bus Ranger Stops":14,"Ranger Vehicle Ranger Stop":65,"2 Axle Car Entrances":129,"2 Axle Truck Entrances":93,"3 Axle Truck Entrances":70,"4 Axle Truck Entrances":66,"2 Axle Bus Entrances":48,"3 Axle Bus Entrances":20,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":1,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":69,"2 Axle Car General Gates":105,"2 Axle Truck General Gates":81,"3 Axle Truck General Gates":61,"4 Axle Truck General Gates":54,"2 Axle Bus General Gates":39,"3 Axle Bus General Gates":19,"Ranger Vehicle General Gates":65,"2 Axle Car Camping":9,"2 Axle Truck Camping":9,"3 Axle Truck Camping":11,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":43,"entrance 0":147,"entrance 1":168,"entrance 2":171,"entrance 3":185,"entrance 4":175,"ranger-stop 0":294,"ranger-stop 1":13,"ranger-stop 2":293,"ranger-stop 3":41,"ranger-stop 4":21,"ranger-stop 5":24,"ranger-stop 6":58,"ranger-stop 7":26,"gate 0":7,"gate 1":7,"gate 2":13,"gate 3":41,"gate 4":24,"gate 5":58,"gate 6":43,"gate 7":26,"gate 8":69,"general gate 0":1,"general gate 1":292,"general gate 2":294,"general gate 3":21,"general gate 4":152,"general gate 5":199,"general gate 6":10,"general gate 7":210,"camping 0":5,"camping 1":2,"camping 2":5,"camping 3":12,"camping 4":3,"camping 5":4,"camping 6":7,"camping 7":10,"camping 8":29},{"Month":11,"2 Axle Car":141,"2 Axle Truck":120,"Ranger Vehicle":82,"3 Axle Truck":55,"4 Axle Truck":66,"2 Axle Bus":40,"3 Axle Bus":20,"2 Axle Car Ranger Stops":89,"2 Axle Truck Ranger Stops":70,"3 Axle Truck Ranger Stops":35,"4 Axle Truck Ranger Stops":39,"2 Axle Bus Ranger Stops":23,"3 Axle Bus Ranger Stops":8,"Ranger Vehicle Ranger Stop":82,"2 Axle Car Entrances":140,"2 Axle Truck Entrances":120,"3 Axle Truck Entrances":55,"4 Axle Truck Entrances":66,"2 Axle Bus Entrances":40,"3 Axle Bus Entrances":20,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":1,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":82,"2 Axle Car General Gates":114,"2 Axle Truck General Gates":97,"3 Axle Truck General Gates":40,"4 Axle Truck General Gates":52,"2 Axle Bus General Gates":34,"3 Axle Bus General Gates":13,"Ranger Vehicle General Gates":80,"2 Axle Car Camping":19,"2 Axle Truck Camping":8,"3 Axle Truck Camping":6,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":52,"entrance 0":163,"entrance 1":173,"entrance 2":184,"entrance 3":165,"entrance 4":185,"ranger-stop 0":294,"ranger-stop 1":16,"ranger-stop 2":293,"ranger-stop 3":45,"ranger-stop 4":22,"ranger-stop 5":37,"ranger-stop 6":71,"ranger-stop 7":23,"gate 0":8,"gate 1":8,"gate 2":16,"gate 3":45,"gate 4":37,"gate 5":71,"gate 6":49,"gate 7":23,"gate 8":82,"general gate 0":0,"general gate 1":290,"general gate 2":294,"general gate 3":29,"general gate 4":169,"general gate 5":203,"general gate 6":9,"general gate 7":229,"camping 0":9,"camping 1":0,"camping 2":7,"camping 3":9,"camping 4":15,"camping 5":9,"camping 6":8,"camping 7":9,"camping 8":37},{"Month":12,"2 Axle Car":169,"2 Axle Truck":153,"Ranger Vehicle":68,"3 Axle Truck":78,"4 Axle Truck":74,"2 Axle Bus":44,"3 Axle Bus":27,"2 Axle Car Ranger Stops":109,"2 Axle Truck Ranger Stops":89,"3 Axle Truck Ranger Stops":46,"4 Axle Truck Ranger Stops":47,"2 Axle Bus Ranger Stops":23,"3 Axle Bus Ranger Stops":18,"Ranger Vehicle Ranger Stop":67,"2 Axle Car Entrances":169,"2 Axle Truck Entrances":153,"3 Axle Truck Entrances":78,"4 Axle Truck Entrances":74,"2 Axle Bus Entrances":44,"3 Axle Bus Entrances":27,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":0,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":68,"2 Axle Car General Gates":136,"2 Axle Truck General Gates":115,"3 Axle Truck General Gates":64,"4 Axle Truck General Gates":63,"2 Axle Bus General Gates":37,"3 Axle Bus General Gates":22,"Ranger Vehicle General Gates":63,"2 Axle Car Camping":16,"2 Axle Truck Camping":13,"3 Axle Truck Camping":3,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":34,"entrance 0":217,"entrance 1":197,"entrance 2":209,"entrance 3":240,"entrance 4":216,"ranger-stop 0":358,"ranger-stop 1":12,"ranger-stop 2":353,"ranger-stop 3":38,"ranger-stop 4":15,"ranger-stop 5":28,"ranger-stop 6":54,"ranger-stop 7":21,"gate 0":7,"gate 1":7,"gate 2":12,"gate 3":38,"gate 4":28,"gate 5":54,"gate 6":35,"gate 7":21,"gate 8":68,"general gate 0":0,"general gate 1":351,"general gate 2":358,"general gate 3":26,"general gate 4":176,"general gate 5":232,"general gate 6":7,"general gate 7":238,"camping 0":3,"camping 1":0,"camping 2":6,"camping 3":3,"camping 4":9,"camping 5":4,"camping 6":9,"camping 7":7,"camping 8":31},{"Month":13,"2 Axle Car":497,"2 Axle Truck":302,"Ranger Vehicle":71,"3 Axle Truck":184,"4 Axle Truck":141,"2 Axle Bus":109,"3 Axle Bus":38,"2 Axle Car Ranger Stops":311,"2 Axle Truck Ranger Stops":191,"3 Axle Truck Ranger Stops":115,"4 Axle Truck Ranger Stops":84,"2 Axle Bus Ranger Stops":73,"3 Axle Bus Ranger Stops":23,"Ranger Vehicle Ranger Stop":71,"2 Axle Car Entrances":496,"2 Axle Truck Entrances":302,"3 Axle Truck Entrances":184,"4 Axle Truck Entrances":141,"2 Axle Bus Entrances":109,"3 Axle Bus Entrances":38,"Ranger Vehicle Entrances":0,"2 Axle Car Gates":0,"2 Axle Truck Gates":0,"3 Axle Truck Gates":0,"4 Axle Truck Gates":3,"2 Axle Bus Gates":0,"3 Axle Bus Gates":0,"Ranger Vehicle Gates":71,"2 Axle Car General Gates":433,"2 Axle Truck General Gates":266,"3 Axle Truck General Gates":154,"4 Axle Truck General Gates":109,"2 Axle Bus General Gates":88,"3 Axle Bus General Gates":33,"Ranger Vehicle General Gates":67,"2 Axle Car Camping":240,"2 Axle Truck Camping":108,"3 Axle Truck Camping":75,"4 Axle Truck Camping":0,"2 Axle Bus Camping":0,"3 Axle Bus Camping":0,"Ranger Vehicle Camping":52,"entrance 0":458,"entrance 1":452,"entrance 2":519,"entrance 3":541,"entrance 4":453,"ranger-stop 0":815,"ranger-stop 1":16,"ranger-stop 2":815,"ranger-stop 3":47,"ranger-stop 4":15,"ranger-stop 5":35,"ranger-stop 6":66,"ranger-stop 7":24,"gate 0":9,"gate 1":9,"gate 2":16,"gate 3":47,"gate 4":35,"gate 5":66,"gate 6":49,"gate 7":24,"gate 8":71,"general gate 0":5,"general gate 1":809,"general gate 2":815,"general gate 3":41,"general gate 4":513,"general gate 5":480,"general gate 6":63,"general gate 7":655,"camping 0":46,"camping 1":7,"camping 2":52,"camping 3":62,"camping 4":67,"camping 5":58,"camping 6":57,"camping 7":63,"camping 8":76}]}
bubbleData = [{"gateName":"entrance 0","gateType":"Entrances","gateX":63,"gateY":186,"M1":449,"M2":924,"M3":1380,"M4":1163,"M5":859,"M6":311,"M7":118,"M8":61,"M9":61,"M10":147,"M11":163,"M12":217,"M13":458},{"gateName":"entrance 1","gateType":"Entrances","gateX":18,"gateY":132,"M1":425,"M2":890,"M3":1303,"M4":1086,"M5":837,"M6":301,"M7":112,"M8":64,"M9":54,"M10":168,"M11":173,"M12":197,"M13":452},{"gateName":"entrance 2","gateType":"Entrances","gateX":184,"gateY":112,"M1":451,"M2":970,"M3":1558,"M4":1253,"M5":896,"M6":337,"M7":122,"M8":61,"M9":52,"M10":171,"M11":184,"M12":209,"M13":519},{"gateName":"entrance 3","gateType":"Entrances","gateX":116,"gateY":168,"M1":484,"M2":1195,"M3":1779,"M4":1572,"M5":1098,"M6":378,"M7":120,"M8":64,"M9":64,"M10":185,"M11":165,"M12":240,"M13":541},{"gateName":"entrance 4","gateType":"Entrances","gateX":141,"gateY":15,"M1":424,"M2":994,"M3":1498,"M4":1230,"M5":880,"M6":349,"M7":111,"M8":46,"M9":52,"M10":175,"M11":185,"M12":216,"M13":453},{"gateName":"ranger-stop 0","gateType":"Ranger Stops","gateX":89,"gateY":183,"M1":766,"M2":1815,"M3":2878,"M4":2360,"M5":1723,"M6":620,"M7":222,"M8":111,"M9":115,"M10":294,"M11":294,"M12":358,"M13":815},{"gateName":"ranger-stop 1","gateType":"Ranger Stops","gateX":20,"gateY":175,"M1":24,"M2":20,"M3":20,"M4":16,"M5":17,"M6":15,"M7":19,"M8":16,"M9":21,"M10":13,"M11":16,"M12":12,"M13":16},{"gateName":"ranger-stop 2","gateType":"Ranger Stops","gateX":81,"gateY":164,"M1":762,"M2":1813,"M3":2875,"M4":2357,"M5":1721,"M6":618,"M7":219,"M8":111,"M9":113,"M10":293,"M11":293,"M12":353,"M13":815},{"gateName":"ranger-stop 3","gateType":"Ranger Stops","gateX":149,"gateY":154,"M1":50,"M2":53,"M3":41,"M4":48,"M5":45,"M6":54,"M7":49,"M8":49,"M9":56,"M10":41,"M11":45,"M12":38,"M13":47},{"gateName":"ranger-stop 4","gateType":"Ranger Stops","gateX":19,"gateY":104,"M1":35,"M2":25,"M3":20,"M4":25,"M5":23,"M6":26,"M7":27,"M8":24,"M9":24,"M10":21,"M11":22,"M12":15,"M13":15},{"gateName":"ranger-stop 5","gateType":"Ranger Stops","gateX":152,"gateY":81,"M1":39,"M2":42,"M3":28,"M4":32,"M5":32,"M6":41,"M7":38,"M8":38,"M9":43,"M10":24,"M11":37,"M12":28,"M13":35},{"gateName":"ranger-stop 6","gateType":"Ranger Stops","gateX":124,"gateY":52,"M1":77,"M2":66,"M3":60,"M4":62,"M5":58,"M6":64,"M7":65,"M8":65,"M9":74,"M10":58,"M11":71,"M12":54,"M13":66},{"gateName":"ranger-stop 7","gateType":"Ranger Stops","gateX":101,"gateY":47,"M1":33,"M2":30,"M3":24,"M4":23,"M5":25,"M6":21,"M7":29,"M8":27,"M9":29,"M10":26,"M11":23,"M12":21,"M13":24},{"gateName":"gate 0","gateType":"Gates","gateX":64,"gateY":166,"M1":11,"M2":5,"M3":5,"M4":6,"M5":3,"M6":4,"M7":9,"M8":10,"M9":4,"M10":7,"M11":8,"M12":7,"M13":9},{"gateName":"gate 1","gateType":"Gates","gateX":59,"gateY":155,"M1":11,"M2":5,"M3":5,"M4":6,"M5":3,"M6":4,"M7":9,"M8":10,"M9":4,"M10":7,"M11":8,"M12":7,"M13":9},{"gateName":"gate 2","gateType":"Gates","gateX":25,"gateY":145,"M1":24,"M2":20,"M3":14,"M4":16,"M5":17,"M6":15,"M7":19,"M8":16,"M9":21,"M10":13,"M11":16,"M12":12,"M13":16},{"gateName":"gate 3","gateType":"Gates","gateX":150,"gateY":139,"M1":50,"M2":53,"M3":41,"M4":48,"M5":45,"M6":54,"M7":49,"M8":49,"M9":56,"M10":41,"M11":45,"M12":38,"M13":47},{"gateName":"gate 4","gateType":"Gates","gateX":165,"gateY":115,"M1":39,"M2":42,"M3":28,"M4":32,"M5":32,"M6":41,"M7":38,"M8":38,"M9":43,"M10":24,"M11":37,"M12":28,"M13":35},{"gateName":"gate 5","gateType":"Gates","gateX":132,"gateY":53,"M1":77,"M2":66,"M3":60,"M4":62,"M5":58,"M6":64,"M7":65,"M8":65,"M9":74,"M10":58,"M11":71,"M12":54,"M13":66},{"gateName":"gate 6","gateType":"Gates","gateX":117,"gateY":48,"M1":58,"M2":48,"M3":44,"M4":46,"M5":42,"M6":38,"M7":51,"M8":45,"M9":50,"M10":43,"M11":49,"M12":35,"M13":49},{"gateName":"gate 7","gateType":"Gates","gateX":98,"gateY":39,"M1":33,"M2":30,"M3":24,"M4":23,"M5":25,"M6":21,"M7":29,"M8":27,"M9":29,"M10":26,"M11":23,"M12":21,"M13":24},{"gateName":"gate 8","gateType":"Gates","gateX":139,"gateY":18,"M1":96,"M2":78,"M3":69,"M4":74,"M5":71,"M6":75,"M7":84,"M8":75,"M9":86,"M10":69,"M11":82,"M12":68,"M13":71},{"gateName":"general gate 0","gateType":"General Gates","gateX":111,"gateY":190,"M1":7,"M2":28,"M3":41,"M4":30,"M5":24,"M6":7,"M7":2,"M8":0,"M9":1,"M10":1,"M11":0,"M12":0,"M13":5},{"gateName":"general gate 1","gateType":"General Gates","gateX":65,"gateY":174,"M1":760,"M2":1812,"M3":2873,"M4":2355,"M5":1719,"M6":617,"M7":216,"M8":108,"M9":110,"M10":292,"M11":290,"M12":351,"M13":809},{"gateName":"general gate 2","gateType":"General Gates","gateX":105,"gateY":167,"M1":765,"M2":1815,"M3":2877,"M4":2360,"M5":1722,"M6":620,"M7":222,"M8":111,"M9":115,"M10":294,"M11":294,"M12":358,"M13":815},{"gateName":"general gate 3","gateType":"General Gates","gateX":187,"gateY":144,"M1":46,"M2":116,"M3":173,"M4":144,"M5":83,"M6":52,"M7":30,"M8":32,"M9":36,"M10":21,"M11":29,"M12":26,"M13":41},{"gateName":"general gate 4","gateType":"General Gates","gateX":70,"gateY":101,"M1":496,"M2":1378,"M3":2268,"M4":1777,"M5":1320,"M6":376,"M7":117,"M8":75,"M9":70,"M10":152,"M11":169,"M12":176,"M13":513},{"gateName":"general gate 5","gateType":"General Gates","gateX":125,"gateY":88,"M1":462,"M2":1151,"M3":1767,"M4":1439,"M5":1035,"M6":407,"M7":159,"M8":99,"M9":124,"M10":199,"M11":203,"M12":232,"M13":480},{"gateName":"general gate 6","gateType":"General Gates","gateX":137,"gateY":62,"M1":43,"M2":184,"M3":323,"M4":263,"M5":186,"M6":42,"M7":11,"M8":7,"M9":12,"M10":10,"M11":9,"M12":7,"M13":63},{"gateName":"general gate 7","gateType":"General Gates","gateX":66,"gateY":55,"M1":647,"M2":1700,"M3":2728,"M4":2197,"M5":1622,"M6":479,"M7":166,"M8":112,"M9":103,"M10":210,"M11":229,"M12":238,"M13":655},{"gateName":"camping 0","gateType":"Camping","gateX":53,"gateY":158,"M1":36,"M2":155,"M3":260,"M4":176,"M5":122,"M6":34,"M7":8,"M8":8,"M9":2,"M10":5,"M11":9,"M12":3,"M13":46},{"gateName":"camping 1","gateType":"Camping","gateX":130,"gateY":149,"M1":7,"M2":31,"M3":49,"M4":35,"M5":26,"M6":8,"M7":4,"M8":0,"M9":1,"M10":2,"M11":0,"M12":0,"M13":7},{"gateName":"camping 2","gateType":"Camping","gateX":45,"gateY":135,"M1":56,"M2":203,"M3":374,"M4":276,"M5":207,"M6":45,"M7":4,"M8":6,"M9":4,"M10":5,"M11":7,"M12":6,"M13":52},{"gateName":"camping 3","gateType":"Camping","gateX":46,"gateY":131,"M1":61,"M2":225,"M3":335,"M4":306,"M5":198,"M6":51,"M7":13,"M8":10,"M9":7,"M10":12,"M11":9,"M12":3,"M13":62},{"gateName":"camping 4","gateType":"Camping","gateX":49,"gateY":110,"M1":49,"M2":252,"M3":443,"M4":361,"M5":238,"M6":42,"M7":5,"M8":11,"M9":7,"M10":3,"M11":15,"M12":9,"M13":67},{"gateName":"camping 5","gateType":"Camping","gateX":21,"gateY":78,"M1":69,"M2":306,"M3":538,"M4":405,"M5":284,"M6":44,"M7":7,"M8":4,"M9":6,"M10":4,"M11":9,"M12":4,"M13":58},{"gateName":"camping 6","gateType":"Camping","gateX":151,"gateY":22,"M1":60,"M2":233,"M3":354,"M4":289,"M5":186,"M6":55,"M7":8,"M8":7,"M9":11,"M10":7,"M11":8,"M12":9,"M13":57},{"gateName":"camping 7","gateType":"Camping","gateX":182,"gateY":54,"M1":43,"M2":184,"M3":321,"M4":263,"M5":186,"M6":42,"M7":11,"M8":7,"M9":12,"M10":10,"M11":9,"M12":7,"M13":63},{"gateName":"camping 8","gateType":"Camping","gateX":184,"gateY":151,"M1":94,"M2":296,"M3":506,"M4":407,"M5":251,"M6":83,"M7":40,"M8":40,"M9":40,"M10":29,"M11":37,"M12":31,"M13":76}];

loadData();


function loadData() {
	console.log("I'm here what is this")

	allData = jsonData 
	someData = bubbleData
	

		//data by years
	allData.months.forEach(function (d) {
		d.Month = parseInt(d.Month.toString());
	});

		// Update color scale (all column headers except "Year")
		// We will use the color scale later for the stacked area chart
		colorScale.domain(defaultCars);
		//console.log(allData)
		createVis();
}

// -------------------------------------------------------------------------------------
function createVis() {
	// Instantiate visualization objects
	areachart = new StackedAreaChart("stacked-area-chart", allData.layers);
	timeline = new Timeline("timeline", allData.months);
	bubbleplot = new BubblePlot("bubble-plot", someData);
}

function defaultSelection(){
	areachart.x = d3.scaleLinear()
		.range([0, areachart.width])
		.domain(d3.extent(areachart.data, function (d) { return d.Month; }))

	areachart.xAxis = d3.axisBottom()
		.scale(areachart.x);

	areachart.updateVis();
}


// React to 'brushed' event and update domain (x-scale; stacked area chart) if selection is not empty
function brushed() {
    var selection = d3.brushSelection(d3.select(".brush").node());

	if(selection != null){
		var newX = d3.scaleLinear()
			.range([0,areachart.width])
			.domain(d3.extent(areachart.data, function(d) { return(d.Month)}))

		var months = selection.map(newX.invert, newX);
		
		areachart.x = d3.scaleLinear()
			.range([0,areachart.width])
			.domain(selection.map(newX.invert, newX));
	

		areachart.xAxis = d3.axisBottom()
			.scale(areachart.x)

		areachart.updateVis();
		startMonth = Math.floor(months[0])
		endMonth = Math.ceil(months[1]);
		bubbleplot.updateVis(defaultGates, startMonth, endMonth)
	}
	else {
		selection = defaultSelection()
	}

}

function brushend() {
    var selection = d3.brushSelection(d3.select(".brush").node());

	if(selection == null){
		selection = defaultSelection()
	}
}

// Helper function to trim the tooltip text **** GAVE THIS TO STUDENTS
function excerpt(fullText, limit) {
	if (fullText.length > limit) {

		// Trim the string to the maximum length
		var trimmedText = fullText.substr(0, limit);

		// Re-trim if we are in the middle of a word
		trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")))

		return trimmedText + "...";
	} else {
		return fullText;
	}
}
// -----------------------------------------------------------------------------------------

// FILTERING DATA

// Checks all boxes to reset
function checkAll(boxes)
{
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].checked = true;
	}
}

// Get checked boxes and apply filter to data set
function filterData(car)
{
	var filters = [];
	var gates = document.getElementsByClassName("checkboxGates");
	var gateNames = [];

	for (var i = 0; i < gates.length; i++) {
		if (gates[i].checked) {
			filters.push(car + " " + gates[i].value);
			gateNames.push(gates[i].value);
		}
	}
	console.log(filters);
	colorScale.domain(filters);
	areachart.updateVis();
	bubbleplot.updateVis(gateNames, 0, 13);
	return filters;
}

function resetViz()
{
	colorScale.domain(defaultCars);
	bubbleplot.updateVis(defaultGates, 0, 13);
	areachart.updateVis();
	

	checkAll(document.getElementsByClassName("checkboxGates"));
}

// Get checked boxes
// function getFilters()
// {
// 	var carFilters = [];
// 	var gateFilters = [];
// 	var cars = document.getElementsByClassName("checkboxCars");
// 	var gates = document.getElementsByClassName("checkboxGates")

// 	for (var i = 0; i < cars.length; i++) {
// 		if (cars[i].checked) {
// 			carFilters.push(cars[i].value);
// 		}
// 	}

// 	for (var i = 0; i < gates.length; i++) {
// 		if (gates[i].checked) {
// 			gateFilters.push(gates[i].value);
// 		}
// 	}

// 	return [carFilters, gateFilters]
// }