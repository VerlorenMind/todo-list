# from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from server.models import List, ListItem
from django.contrib.auth.models import User
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from django.test import LiveServerTestCase
import pytest


@pytest.mark.django_db
class LoginTest(LiveServerTestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        # Create a couple of users
        self.alice = User.objects.create_user('Alice', 'alice@example.com', 'alicepassword')
        self.bob = User.objects.create_user('Bob', 'bob@example.com', 'bobpassword')
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

    def tearDown(self) -> None:
        self.driver.quit()

    def test_user_can_login(self):
        self.driver.get(self.live_server_url)
        # Checking the title of the page
        self.assertIn("Todo Lists", self.driver.title)
        elem = self.driver.find_element(By.TAG_NAME, 'h1')
        self.assertIn("Todo Lists app", elem.text)
        self.assertIn("login", self.driver.current_url)
        # User locates the login form
        form = self.driver.find_element(By.CLASS_NAME, 'login-form')
        login = form.find_element(By.NAME, 'username')
        pwd = form.find_element(By.NAME, 'password')
        btn = form.find_element(By.TAG_NAME, 'button')
        # User clicks the submit button without entering credentials
        btn.click()
        errs = self.driver.find_elements(By.CLASS_NAME, 'error-msg')
        self.assertIn("This field may not be blank.", errs[0].text)
        self.assertIn("This field may not be blank.", errs[1].text)
        # User enters wrong password and gets error messages
        login.send_keys('wronglogin')
        pwd.send_keys('wrongpwd')
        btn.click()
        errs = self.driver.find_elements(By.CLASS_NAME, 'error-msg')
        self.assertIn("Unable to log in with provided credentials.", errs[2].text)
        # User finally enters the correct credentials
        login.clear()
        pwd.clear()
        login.send_keys('Alice')
        pwd.send_keys('alicepassword')
        btn.click()
        # User gets on the page with their lists and an option to create a new one
        self.assertIn('Create new list', self.driver.find_element(By.LINK_TEXT, 'Create new list').text)
        lists = self.driver.find_element(By.TAG_NAME, 'ul')
        items = lists.find_elements(By.TAG_NAME, 'li')
        self.assertTrue(len(items) == 2)
        for item in items:
            self.assertIn(item.text, ['Alice list 1', 'Alice list 2'])

