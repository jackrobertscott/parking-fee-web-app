(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneVehicleCtrl', OneVehicleCtrl);

  OneVehicleCtrl.$inject = ['dataVehicle', 'glitch', '$state', 'Auth', '$stateParams'];

  function OneVehicleCtrl(dataVehicle, glitch, $state, Auth, $stateParams) {
    var vm = this;

    vm.vehicle = {};
    vm.glitch = glitch;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // replace these with real values
      vm.makes = ['Acura', 'Alfa Romeo Logo', 'Alfa Romeo', 'Aston Martin Logo', 'Aston Martin', 'Audi Logo', 'Audi', 'Bentley Logo', 'Bentley', 'BMW Logo', 'BMW', 'Bugatti Logo', 'Bugatti', 'Buick Logo', 'Buick', 'Cadillac Logo', 'Cadillac', 'Chevrolet Logo', 'Chevrolet', 'Chrysler Logo', 'Chrysler', 'Citroen Logo', 'Citroen', 'Dodge Logo', 'Dodge', 'Ferrari Logo', 'Ferrari', 'Fiat Logo', 'Fiat', 'Ford Logo', 'Ford', 'Geely Logo', 'Geely', 'General Motors Logo', 'General Motors', 'GMC Logo', 'GMC', 'Honda Logo', 'Honda', 'Hyundai Logo', 'Hyundai', 'Infiniti Logo', 'Infiniti', 'Jaguar Logo', 'Jaguar', 'Jeep Logo', 'Jeep', 'Kia Motors Logo', 'Kia', 'Koenigsegg', 'Koenigsegg', 'Lamborghini Logo', 'Lamborghini', 'Land Rover Logo', 'Land Rover', 'Lexus Logo', 'Lexus', 'Maserati Logo', 'Maserati', 'Mazda Logo', 'Mazda', 'McLaren Logo', 'McLaren', 'Mercedes Benz Logo', 'Mercedes', 'Mini Logo', 'Mini', 'Mitsubishi Motors Logo', 'Mitsubishi', 'Nissan Logo', 'Nissan', 'Pagani', 'Pagani', 'Peugeot Logo', 'Peugeot', 'Porsche Logo', 'Porsche', 'RAM Logo', 'Ram', 'Renault Logo', 'Renault', 'Rolls Royce Logo', 'Rolls Royce', 'Saab', 'Saab', 'Subaru Logo', 'Subaru', 'Suzuki Logo', 'Suzuki', 'TATA Motors', 'Tata Motors', 'Tesla Motors Logo', 'Tesla Motors', 'Toyota Logo', 'Toyota', 'Volkswagen Logo', 'Volkswagen', 'Volvo Logo', 'Volvo', 'Other'];
      vm.types = ['Aerosani', 'Airship', 'All-terrain vehicle', 'Amphibious all-terrain vehicle', 'Amphibious vehicle', 'Autobus', 'Autogyro', 'Automobile', 'Auto rickshaw', 'Balloon', 'Bathyscaphe', 'Bicycle', 'Blimp', 'Boat', 'Bus', 'Cable car', 'Canoe', 'Coach (bus)', 'Coach (carriage)', 'Cycle rickshaw', 'Dandy horse', 'Deep Submergence Vehicle', 'Diving bell', 'Diving chamber', 'Dog sled', 'Draisine', 'Electric vehicle', 'Fixed-wing aircraft', 'Golf cart', 'Ground effect vehicle', 'Glider aircraft', 'Handcar', 'Hang glider', 'Hopper[1]', 'Helicopter', 'Hovercraft', 'Hydrofoil', 'Ice Skates', 'Jet aircraft', 'Jet pack', 'Kayak', 'Kick scooter', 'Land yacht', 'Launch escape capsule', 'Locomotive', 'Maglev', 'Minibus', 'Minivan', 'Monorail', 'Monowheel', 'Moped', 'Motorcycle', 'Omni Directional Vehicle', 'Ornithopter', 'Passenger car', 'Rickshaw', 'Pedalo', 'Pogo Stick', 'Powered parachute', 'Quadracycle', 'Road train', 'Rocket', 'Rocket sled', 'Rover', 'Sailboat', 'Scooter (motorcycle)', 'Screw-propelled vehicle', 'Sea tractor', 'Segway Personal Transporter', 'Ship', 'Single-track vehicle', 'Skateboard', 'Skis', 'Sled', 'Snowboard', 'Snowmobile', 'Space Hopper', 'Steam car', 'Submarine', 'Submersible', 'Surfboard', 'Tank', 'Tractor', 'Traction engine', 'Train', 'Tram', 'Tricycle', 'Trolleybus', 'Truck', 'Unicycle', 'Unmanned aerial vehicle', 'Van', 'Velocipede', 'Velomobile', 'Wagon', 'Wheelbarrow', 'Wingpack', 'Yacht', 'Zipline', 'Other'];
      vm.colors = ['Black', 'Blue', 'Brown', 'Grey', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'White', 'Yellow'];
      vm.vehicle.make = vm.makes[0];
      vm.vehicle.type = vm.types[0];
      vm.vehicle.color = vm.colors[0];
    }

    ////////////

    function getOne(id) {
      vm.glitch.reset();
      id = id || $stateParams.id;
      dataVehicle.getOne(id)
        .then(function(vehicle) {
          vm.vehicle = vehicle;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        var user = Auth.getCurrentUser();
        angular.extend(vm.vehicle, {
          _creator: user._id,
          users: [user._id]
        });
        dataVehicle.create(vm.vehicle)
          .then(function(vehicle) {
            $state.go('dashboard.user.settings', {}, {reload: true});
          })
          .catch(vm.glitch.handle);
      }
    }

    function update(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataVehicle.update(vm.vehicle)
          .then(function(vehicle) {
            vm.glitch.setSuccess('Successfully updated');
            vm.submitted = false;
          })
          .catch(vm.glitch.handle);
      }
    }

    function remove(form) {
      vm.glitch.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataVehicle.remove(vm.vehicle)
          .then(function() {
            vm.vehicle = {};
            $state.go('dashboard.user.settings');
          })
          .catch(vm.glitch.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
