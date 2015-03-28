var myApp = angular.module('myApp', []);


//CONTROLERS
myApp.controller('myController', ['$scope', function($scope) {

	$scope.title = 'NYCDA AngularJS 102 - Homework 1';
	$scope.subtitle = "SBODI's Homework Assignment 1";
	$scope.colors = 'default';
	/*$scope.colors = [
		{
			value: 'Default'
		},
		{
			value: 'Blue'
		},
		{
			value: 'Red'
		},
		{
			value: 'Green'
		},
		{
			value: 'Purple'
		},
		{
			value: 'Yellow'
		},
	];*/
	console.log($scope.colors);
	$scope.folders = [
		{
			folderName: 'Folder1'
		},
		{
			folderName: 'Folder2'
		},
		{
			folderName: 'Folder2'
		}
	];

	$scope.items = [
		{
			name: 'Folder1'
		},
		{
			name: 'Folder2'
		},
		{
			name: 'Folder3'
		}
	];

	$scope.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis lorem, euismod ac mauris non, blandit finibus sapien. Cras consectetur urna in quam tincidunt, in auctor ante aliquet. Duis interdum vestibulum mi ac tincidunt. Suspendisse efficitur erat nec purus viverra lacinia. Integer sodales ullamcorper placerat. Morbi cursus mi sit amet leo ornare, non consequat massa lacinia. Phasellus gravida eget odio cursus vulputate. Nulla pharetra ipsum non nunc placerat pellentesque. Vestibulum tincidunt, lectus a scelerisque gravida, purus metus ultricies ligula, non tincidunt eros augue eu est. Pellentesque placerat arcu luctus, rutrum dolor vel, tincidunt sem. Nulla eleifend pellentesque lorem, quis suscipit augue mattis et. Nullam gravida posuere dapibus. Donec sapien diam, viverra et efficitur vitae, suscipit eu quam. Suspendisse posuere sed nulla a facilisis. Ut nunc leo, lobortis sed arcu ac, pretium efficitur mauris. Quisque nibh lectus, elementum nec posuere eget, bibendum sit amet odio. Sed commodo justo at tincidunt efficitur. Aliquam luctus tempor condimentum. Proin nunc ipsum, ultrices sit amet faucibus id, dictum in velit. In molestie imperdiet libero in commodo. Donec nunc nunc, pulvinar eu interdum sed, lobortis nec nunc. Suspendisse justo eros, consequat vitae ante at, aliquam molestie urna. Cras commodo ultrices ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla facilisi. Vestibulum venenatis eu leo ut cursus. Vestibulum nec elit egestas, accumsan massa sit amet, tempor turpis. Nullam eu est ligula. Pellentesque vel lacus id erat pulvinar convallis. Curabitur massa neque, sagittis id orci aliquet, hendrerit egestas nulla. Nullam ultricies diam nec faucibus aliquet. Aliquam erat volutpat. Nullam tempus pretium iaculis. Nam id orci a turpis pulvinar lobortis. Sed blandit feugiat purus eget placerat. Nullam cursus nisl ac lacus hendrerit, ac ultrices odio finibus. Nulla facilisi. Nullam in fermentum arcu. Nullam iaculis purus sit amet metus commodo blandit. Donec molestie cursus finibus. In ut justo ex. Maecenas quam ante, venenatis id vehicula ut, tincidunt nec enim. Aenean facilisis ante quis nisl sollicitudin malesuada. Pellentesque scelerisque elit ut nisl ornare sagittis. Mauris justo dolor, consequat eget placerat non, viverra eu dolor. Duis arcu magna, pretium quis ornare ut, pulvinar sit amet erat. Phasellus iaculis eleifend sapien, et tincidunt magna porttitor et. Vivamus vulputate orci eu enim sagittis vulputate. Curabitur ante quam, dapibus at sem sit amet, interdum finibus turpis. Proin molestie enim sollicitudin, luctus nunc sit amet, varius risus. Proin mollis, nisl quis suscipit imperdiet, dui orci porta eros, a ullamcorper erat lacus vitae urna. Donec finibus neque at tortor dapibus, quis hendrerit urna porttitor. Sed non lorem facilisis, euismod erat eu, lacinia lorem. Donec imperdiet bibendum libero, ut varius mi auctor ut. Integer facilisis massa dignissim, faucibus metus vel, faucibus lorem. Donec viverra bibendum massa, et venenatis enim vestibulum quis. Ut at quam vitae dui blandit porta. Aenean quis mi erat. Vivamus in bibendum nisl.';


}]);