lonely('service3', function () {
    return 'service 3'
}, []);

lonely('service1', function (service3) {
    return 'service 1 - ' + service3;
}, ['service3']);

lonely('service4', 'henrique');

lonely('service2', function (service1, service3, service4) {
    console.log(service1, service3, service4, 'service2');
}, ['service1', 'service3', 'service4']);

lonely('service2');