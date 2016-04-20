
var expect = chai.expect;


describe("Probando CSV", function() {

  it("Comas dentro de cadenas", function(){
    var cadena = '"a,b", 1';
    var r = calculate(cadena);
    expect(r[0].value[0]).to.equal('a,b');
    expect(r[0].value[1]).to.equal('1');
  });
  it("Considerando campos vacíos en medio", function(){
    var cadena = '1, ,3';
    var r = calculate(cadena);
    expect(r[0].value[0]).to.equal('1');
    expect(r[0].value[1]).to.equal('');
    expect(r[0].value[2]).to.equal('3');
  });
  it("Considerando campos vacíos al final", function(){
    var cadena = '1,3,';
    var r = calculate(cadena);
    expect(r[0].value[0]).to.equal('1');
    expect(r[0].value[1]).to.equal('3');
    expect(r[0].value[2]).to.equal('');
  });
  it("Considerando campos vacíos al principio", function(){
    var cadena = ',3,4';
    var r = calculate(cadena);
    expect(r[0].value[0]).to.equal('');
    expect(r[0].value[1]).to.equal('3');
    expect(r[0].value[2]).to.equal('4');
  });
});
