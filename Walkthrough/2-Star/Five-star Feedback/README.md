# Five-Star Feedback

**Description**
Get rid of all 5-star customer feedback.

Topic: Broken Access Control

## Solution

Just login as admin (via the sqli) and there there are a `Customer Feedback` page. Next to it there is a DELETE button.

NOTE: This might be possible with a `PATCH` request, it will `UPDATE` the db... Didn't try this.