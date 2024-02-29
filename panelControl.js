var button = "dogButton";

function changeButton() {
  button = "catButton";
}

module.exports = {
    button: button,
    changeButton: changeButton
};
console.log(button); // dogButton