import requests
import sys
import json
from datetime import datetime

class OrthopedieAPITester:
    def __init__(self, base_url="https://ortho-huisbezoek.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "timestamp": datetime.now().isoformat()
            }
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    result["response_data"] = response_data
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                except:
                    result["response_data"] = response.text
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error_data"] = error_data
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    result["error_data"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
            self.test_results.append(result)
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_contact_form_submission(self):
        """Test contact form submission with valid data"""
        test_data = {
            "name": "Test Gebruiker",
            "email": "test@example.com",
            "phone": "+32472123456",
            "location": "Antwerpen",
            "message": "Dit is een test bericht voor de contact form."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact/submit",
            200,
            data=test_data
        )
        
        if success and isinstance(response, dict):
            # Check if response has expected fields
            expected_fields = ["status", "message", "submission_id"]
            for field in expected_fields:
                if field not in response:
                    print(f"⚠️  Warning: Missing field '{field}' in response")
                    return False
            
            if response.get("status") == "success":
                print(f"✅ Contact form submission successful with ID: {response.get('submission_id')}")
                return True
            else:
                print(f"❌ Contact form submission failed: {response.get('message')}")
                return False
        
        return success

    def test_contact_form_validation(self):
        """Test contact form validation with missing required fields"""
        # Test with missing name
        invalid_data = {
            "email": "test@example.com",
            "phone": "+32472123456",
            "location": "Antwerpen"
        }
        
        success, response = self.run_test(
            "Contact Form Validation (Missing Name)",
            "POST",
            "contact/submit",
            422,  # Validation error
            data=invalid_data
        )
        
        return success

    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email"""
        invalid_data = {
            "name": "Test Gebruiker",
            "email": "invalid-email",
            "phone": "+32472123456",
            "location": "Antwerpen"
        }
        
        success, response = self.run_test(
            "Contact Form Invalid Email",
            "POST",
            "contact/submit",
            422,  # Validation error
            data=invalid_data
        )
        
        return success

    def test_get_submissions(self):
        """Test getting all contact submissions (admin endpoint)"""
        success, response = self.run_test(
            "Get Contact Submissions",
            "GET",
            "contact/submissions",
            200
        )
        
        if success and isinstance(response, dict):
            if "submissions" in response and "count" in response:
                print(f"✅ Found {response.get('count')} contact submissions")
                return True
            else:
                print("⚠️  Warning: Response missing expected fields")
                return False
        
        return success

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*60}")
        print(f"📊 BACKEND API TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
        else:
            print("⚠️  Some tests failed. Check the details above.")
        
        return self.tests_passed == self.tests_run

def main():
    print("🚀 Starting Orthopedie Backend API Tests...")
    print("=" * 60)
    
    tester = OrthopedieAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_contact_form_submission,
        tester.test_contact_form_validation,
        tester.test_contact_form_invalid_email,
        tester.test_get_submissions
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print summary
    all_passed = tester.print_summary()
    
    # Save test results to file
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
                "timestamp": datetime.now().isoformat()
            },
            "test_results": tester.test_results
        }, f, indent=2)
    
    print(f"\n📄 Test results saved to: /app/backend_test_results.json")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())