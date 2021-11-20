from django.test import TestCase
from server.models import List, ListItem
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, force_authenticate
from server.views import ListView, ListCreate


class ListAPITestCase(TestCase):
    factory = APIRequestFactory()

    def setUp(self):
        # Create a couple of users
        self.alice = User.objects.create_user('Alice', 'alice@example.com', 'alicepassword')
        self.bob = User.objects.create_user('Bob', 'alice@example.com', 'alicepassword')
        self.alice.save()
        self.bob.save()
        # Create lists for these users
        alice_list_1 = List.objects.create(name='Alice list 1', owner=self.alice)
        alice_list_1.save()
        ListItem.objects.create(contents='Item 1', done=False, list=alice_list_1).save()
        ListItem.objects.create(contents='Item 2', done=True, list=alice_list_1).save()
        ListItem.objects.create(contents='Item 3', done=False, list=alice_list_1).save()
        alice_list_2 = List.objects.create(name='Alice list 2', owner=self.alice)
        alice_list_2.save()
        ListItem.objects.create(contents='Item 1', done=False, list=alice_list_2).save()
        ListItem.objects.create(contents='Item 2', done=True, list=alice_list_2).save()
        bob_list_1 = List.objects.create(name='Bob list 1', owner=self.bob)
        bob_list_1.save()
        ListItem.objects.create(contents='Item 1', done=True, list=bob_list_1).save()
        ListItem.objects.create(contents='Item 2', done=False, list=bob_list_1).save()

    def test_anonymous_cant_get_lists(self):
        # Preparing a request
        request = self.factory.get('/api/lists/')

        response = ListView.as_view()(request)

        # Successful request, anonymous received zero lists
        self.assertTrue(response.status_code == 200)
        self.assertFalse(len(response.data) > 0)

    def test_user_can_get_their_lists(self):
        # Preparing a request
        request = self.factory.get('/api/lists/')
        # Force authenticating user
        force_authenticate(request, user=self.alice)

        # Sending a request
        response = ListView.as_view()(request)

        # Checking the response
        self.assertTrue(response.status_code == 200)
        # First, Alice has only two lists
        self.assertTrue(len(response.data), 2)
        for list in response.data:
            # No lists are owned by Bob
            self.assertFalse(list['owner'] == self.bob)
            self.assertIn(list['name'], ['Alice list 1', 'Alice list 2'])

    def test_user_can_create_list(self):
        # Preparing a request
        request = self.factory.post('/api/lists/create', {
            'name': 'Bob new list', 'items':
                [{'contents': 'New Item 1', 'done': False},
                 {'contents': 'New Item 2', 'done': True}]},
                                    format='json')
        # Force authenticating user
        force_authenticate(request, user=self.bob)

        # Sending a request
        response = ListCreate.as_view()(request)

        # Checking the response
        self.assertTrue(response.status_code == 201)
        # Checking the model
        queryset = List.objects.filter(owner=self.bob)
        self.assertTrue(len(queryset) == 2)
        for list in queryset:
            self.assertIn(list.name, ['Bob new list', 'Bob list 1'])
