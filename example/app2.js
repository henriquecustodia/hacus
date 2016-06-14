lonely('service2', function (service1, service3, service4) {
    debugger
    console.log(service1, service3, service4, 'service2');
}, ['service1', 'service3', 'service4']);

lonely('service2');