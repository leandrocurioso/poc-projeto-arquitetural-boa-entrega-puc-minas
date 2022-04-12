const app = angular.module('frontend-delivery', ['google-maps']);

const deliveryServiceUrl = 'http://ec2-34-203-102-206.compute-1.amazonaws.com:3001';

const directionsDisplay = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();

function updateDeliveries($http, $scope) {
  $http({
    method: 'GET',
    url: `${deliveryServiceUrl}/v1/deliveries/undelivered`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRBY2Nlc3NLZXkiOiIwYTQ3MmJkOC02NzhlLTQ4OTEtYmZjZS0yMzk5YjY0ZGQxOTUiLCJzY29wZXMiOlsiQURNSU4iXX0.qRjJx3Xx-y7X6uvXn-mIaQpVgYP9tASYfmOjgPb1zPA'
    }
   }).then(function(response) {
    $scope.deliveries = response.data;
    $scope.showDeliveries = true;
   });
};

function displayDeliveryInfo($scope) {
  return function(data) {
    $scope.address.street = data.order.client_address_street;
    $scope.address.number = data.order.client_address_number;
    $scope.address.district = data.order.client_address_district;
    $scope.address.zipcode = data.order.client_address_zipcode;
    $scope.address.country = data.order.client_address_country;
    $scope.address.state = data.order.client_address_state;
    $scope.address.city = data.order.client_address_city;
    $scope.address.telephone = data.order.client_telephone;
    
    $scope.showDeliveryInfo = true;
    $scope.map = {
      control: {},
      center: {
          latitude: data.deliveryRoute[0].latitude,
          longitude: data.deliveryRoute[0].longitude
      },
      zoom: 11
    };
    
    // marker object
    $scope.marker = {
      center: {
        latitude: data.deliveryRoute[0].latitude,
        longitude: data.deliveryRoute[0].longitude
      }
    }
    
    $scope.directions = {
      origin: `${data.deliveryRoute[0].latitude}, ${data.deliveryRoute[0].longitude}`,
      destination: `${data.deliveryRoute[1].latitude}, ${data.deliveryRoute[1].longitude}`,
      showList: false
    };

    const request = {
      origin: $scope.directions.origin,
      destination: $scope.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
  
    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap($scope.map.control.getGMap());
        directionsDisplay.setPanel(document.getElementById('directionsList'));
      } else {
        alert('Google route unsuccesfull!');
      }
    });
  };
};   

app.controller('DeliveryListController', function($scope, $document, $http, $interval) {
  $scope.showDeliveries = false;
  $scope.showDeliveryInfo = false;
  $scope.deliveries = [];   
  $scope.address = {};   

  $scope.displayDeliveryInfo = displayDeliveryInfo($scope); 
  updateDeliveries($http, $scope)
  $interval(function () {
    updateDeliveries($http, $scope)
  }, 5000);
});

