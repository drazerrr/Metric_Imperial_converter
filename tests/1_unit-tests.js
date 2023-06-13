const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('Function convertHandler.getNum(input)', function(){

        test('Whole number input', function(done) {
            let input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal Input', function(done) {
            let input = '32.2L';
            assert.equal(convertHandler.getNum(input), 32.2);
            done();
        });

        test('Fractional Input', function(done) {
            let input = '1/32L';
            assert.equal(convertHandler.getNum(input), 1/32);
            done();
        });

        test('Fractional Input w/ Decimal', function(done) {
            let input = '1.2/32.4L';
            assert.equal(convertHandler.getNum(input), 1.2/32.4);
            done();
        });

        test('Double Fractional', function(done) {
            let input = '1/2/32L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test('No Numerical Input', function(done) {
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

    });

    suite('Function convertHandler.getUnit(input)', function(){

        test('For Each Valid Unit Inputs', function(done) {
            let input = [
                "gal",
                "kg",
                "mi",
                "km",
                "lbs",
                "l",
                "GAL",
                "KG",
                "MI",
                "KM",
                "LBS",
                "L"
            ];

            let output = [
                "gal",
                "kg",
                "mi",
                "km",
                "lbs",
                "L",
                "gal",
                "kg",
                "mi",
                "km",
                "lbs",
                "L"
            ];

            input.forEach((elm, index) => {
                assert.equal(convertHandler.getUnit(elm), output[index])
            });
            done();
        });

        test('Unknown Unit Input', function(done) {
            assert.equal(convertHandler.getUnit('34Kilometer', undefined));
            done();
        })

    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function() {
        test('For Each Valid Unit Inputs', function(done) {
            let input = ["gal", "km", "kg", "L", "lbs", "mi"]; 
            let output = ["L", "mi", "lbs", "gal", "kg", "km"];
            
            input.forEach((elem, index) => {
                assert.equal(convertHandler.getReturnUnit(elem), output[index]);
            });
            done();
        });
    });

    suite('Function convertHandler.spellOutUnit(initUnit)', function() {
        test('For Each Valid Unit Inputs', function(done) {
            let input = ["gal", "km", "kg", "L", "lbs", "mi"]; 
            let output = ["gallons", "kilometers", "kilograms", "liters", "pounds", "miles"];
            
            input.forEach((elem, index) => {
                assert.equal(convertHandler.spellOutUnit(elem), output[index]);
            });
            done();
        });
    });

    suite('Function convertHandler.convert(initNum, initUnit)', function() {
        test('Gal to L', function(done) {
            let input = [5, "gal"];
            let expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done();
        });

        test('L to Gal', function(done) {
            let input = [5, "L"];
            let expected = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done();
        });

        test('Mi to Km', function(done) {
            let input = [5, "mi"];
            let expected = 8.04672;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done();
        });

        test('Km to Mi', function(done) {
            let input = [5, "km"];
            let expected = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done();
        });

        test('lbs to Kg', function(done) {
            let input = [5, "lbs"];
            let expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done();
        });

        test('Kg to lbs', function(done) {
            let input = [5, "kg"];
            let expected = 11.0231;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done();
        });
    });

});