define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (audio, created_at, image, lct, name, place) {
buf.push("<li class=\"audio-item\"><div" + (jade.attr("style", "background-image: url(" + (image) + ")", true, false)) + " class=\"user-image inline\"></div><div class=\"user-details inline\"><div class=\"user-name section\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</div><div class=\"main-details section\"><div" + (jade.attr("audio", audio, true, false)) + " class=\"inline info player-image\"></div><div class=\"inline info info\">Posted at &nbsp;</div><div class=\"inline info place\">" + (jade.escape((jade_interp = place) == null ? '' : jade_interp)) + "</div></div><div class=\"other-details section\"><div class=\"info created-at\">" + (jade.escape((jade_interp = created_at) == null ? '' : jade_interp)) + "</div></div><div class=\"location\">" + (jade.escape((jade_interp = lct) == null ? '' : jade_interp)) + "</div></div></li>");}.call(this,"audio" in locals_for_with?locals_for_with.audio:typeof audio!=="undefined"?audio:undefined,"created_at" in locals_for_with?locals_for_with.created_at:typeof created_at!=="undefined"?created_at:undefined,"image" in locals_for_with?locals_for_with.image:typeof image!=="undefined"?image:undefined,"lct" in locals_for_with?locals_for_with.lct:typeof lct!=="undefined"?lct:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"place" in locals_for_with?locals_for_with.place:typeof place!=="undefined"?place:undefined));;return buf.join("");
};

});
