## Api Endpoints

 - **Courses endpoints**

  ```
  POST /api/courses/
  ```

  Create new course.

  Request:

  ```json
  [
    {
   "name": "Introduction to Programming",
  "description": "A comprehensive course on the basics of programming.",
  "educatorId": 1,
  "lectures": [
    {
      "startTime": "2024-08-01T09:00:00Z",
      "endTime": "2024-08-01T10:30:00Z",
      "type": "text",
      "text": "Introduction to programming concepts and languages.",
      "order": 1,
      "tasks": [
        {
          "type": "text",
          "description": "Write a short essay on the importance of programming.",
          "text": "Describe why programming is an essential skill in today's world.",
          "startTime": "2024-08-01T10:30:00Z",
          "endTime": "2024-08-07T23:59:59Z"
        },
        {
          "type": "code",
          "description": "Complete a basic coding exercise.",
          "text": "Write a simple 'Hello World' program in your preferred language.",
          "testcases": [
            { "input": "", "expectedOutput": "Hello World" }
          ],
           "startTime": "2024-08-01T10:30:00Z",
          "endTime": "2024-08-07T23:59:59Z"
        }
      ]
    } 
  ]
  }

  ]
  ```

  Response:

  ```json
  [
    {
    "status": "success",
  "message": "Course created successfully",
  "course": {
    "id": 8,
    "name": "Introduction to Programming",
    "description": "A comprehensive course on the basics of programming.",
    "educatorId": 1,
    "lecturesCount": 1,
    "updatedat": "2024-08-09T13:42:48.122Z",
    "createdat": "2024-08-09T13:42:48.122Z"
  }
  }

  ]
  ```
 
  ```
  GET /api/courses/
  ```

  Retrieve All Courses.

  Response:

  ```json
  [
    {
     
    "id": 1,
    "name": "Introduction to Programming",
    "description": "A comprehensive course on the basics of programming.",
    "educatorId": 1,
    "lecturesCount": 1,
    "createdat": "2024-08-09T13:29:39.299Z",
    "updatedat": "2024-08-09T13:29:39.299Z",
    "lectures": [
      {
        "id": 8,
        "startTime": "2024-08-01T09:00:00.000Z",
        "endTime": "2024-08-02T10:30:00.000Z",
        "type": "text",
        "text": "Introduction to programming concepts and languages.",
        "recordedLink": null,
        "order": 1,
        "courseId": 1,
        "createdat": "2024-08-09T14:59:59.829Z",
        "updatedat": "2024-08-09T14:59:59.829Z",
        "courseID": 1,
        "tasks": [
          {
            "id": 4,
            "type": "text",
            "description": "Write a short essay on the importance of programming.",
            "text": "Describe why programming is an essential skill in today's world.",
            "testcases": null,
            "options": null,
            "answer": null,
            "startTime": "2024-08-01T10:30:00.000Z",
            "endTime": "2024-08-07T23:59:59.000Z",
            "lectureId": 8,
            "createdat": "2024-08-09T14:59:59.851Z",
            "updatedat": "2024-08-09T14:59:59.851Z"
          }
        ]
      }
    ]
  }

  ]
  ```

```
  PUT /api/api/courses/:id
  ```

  Update Course by id.

  Request:

  ```json
  [
    {
   "name": "Introduction to Programming",
    "description": "A comprehensive course on the basics of programming.",
    "educatorId": 1,
    "lecturesCount": 1,
    "createdat": "2024-08-09T13:29:39.299Z",
    "updatedat": "2024-08-10T13:29:39.299Z",
    "lectures": [
      {
        "startTime": "2024-08-01T09:00:00.000Z",
        "endTime": "2024-08-02T10:30:00.000Z",
        "type": "text",
        "text": "Introduction to programming concepts and languages.",
        "recordedLink": null,
        "order": 1,
        "courseId": 1,
        "createdat": "2024-08-09T13:29:39.821Z",
        "updatedat": "2024-08-09T13:29:39.821Z",
        "courseID": null,
        "tasks": [
          {
            "type": "text",
            "description": "Write a short essay on the importance of programming.",
            "text": "Describe why programming is an essential skill in today's world.",
            "testcases": null,
            "options": null,
            "answer": null,
            "startTime": "2024-08-01T10:30:00.000Z",
            "endTime": "2024-08-07T23:59:59.000Z",
            "lectureId": 1,
            "createdat": "2024-08-09T13:29:39.909Z",
            "updatedat": "2024-08-09T13:29:39.909Z"
          }
        ]
      }
    ]
  }

  ]
  ```

  Response:

  ```json
  [
    {
   "status": "success",
  "message": "Course updated successfully",
  "course": {
    "id": 1,
    "name": "Introduction to Programming",
    "description": "A comprehensive course on the basics of programming.",
    "educatorId": 1,
    "lecturesCount": 1,
    "createdat": "2024-08-09T13:29:39.299Z",
    "updatedat": "2024-08-09T13:29:39.299Z"
  }
  }

  ]
  ```

  ```
  GET /api/courses/:id
  ```

  Retrieve Single Course.

  Response:

  ```json
  [
    {
    "course": {
    "id": 1,
    "name": "Introduction to Programming",
    "description": "A comprehensive course on the basics of programming.",
    "educatorId": 1,
    "lecturesCount": 1,
    "createdat": "2024-08-09T13:29:39.299Z",
    "updatedat": "2024-08-09T13:29:39.299Z",
    "lectures": [
      {
        "id": 8,
        "startTime": "2024-08-01T09:00:00.000Z",
        "endTime": "2024-08-02T10:30:00.000Z",
        "type": "text",
        "text": "Introduction to programming concepts and languages.",
        "recordedLink": null,
        "order": 1,
        "courseId": 1,
        "createdat": "2024-08-09T14:59:59.829Z",
        "updatedat": "2024-08-09T14:59:59.829Z",
        "courseID": null,
        "tasks": [
          {
            "id": 4,
            "type": "text",
            "description": "Write a short essay on the importance of programming.",
            "text": "Describe why programming is an essential skill in today's world.",
            "testcases": null,
            "options": null,
            "answer": null,
            "startTime": "2024-08-01T10:30:00.000Z",
            "endTime": "2024-08-07T23:59:59.000Z",
            "lectureId": 8,
            "createdat": "2024-08-09T14:59:59.851Z",
            "updatedat": "2024-08-09T14:59:59.851Z"
          }
        ]
      }
    ]
  }
  }

  ]
  ```

   ```
  DELETE /api/courses/:id
  ```

  DELETE Single Course.

  Response:

  ```json
  [
    {
   {
  "status": "success",
  "message": "Course deleted successfully"
}
  }

  ]
  ```

- **Content endpoints**

  ```
  POST /api/content/upload
  ```

 Upload Content.

  Response:

  ```json
  [
    {
    "status": "success",
  "data": {
    "id": 23,
    "title": "python basics",
    "description": "learn python basics",
    "contentType": "file",
    "contentUrl": "https://res.cloudinary.com/dx0n30auq/image/upload/v1723277048/videos/d4uhatrhba3yyxj1ngbt.png",
    "contentFile": null,
    "contentText": null,
    "uploadedBy": 1,
    "createdAt": "2024-08-10T08:04:07.418Z",
    "lectureId": 3,
    "createdat": "2024-08-10T08:04:07.431Z",
    "updatedat": "2024-08-10T08:04:07.431Z",
    "contentTags": [
      {
        "id": 5,
        "name": "python",
        "createdat": "2024-08-10T08:04:08.417Z",
        "updatedat": "2024-08-10T08:04:08.417Z",
        "ContentTags": {
          "createdat": "2024-08-10T08:04:08.440Z",
          "updatedat": "2024-08-10T08:04:08.440Z",
          "contentId": 23,
          "tagId": 5
        }
      },
      {
        "id": 6,
        "name": "backend",
        "createdat": "2024-08-10T08:04:08.418Z",
        "updatedat": "2024-08-10T08:04:08.418Z",
        "ContentTags": {
          "createdat": "2024-08-10T08:04:08.455Z",
          "updatedat": "2024-08-10T08:04:08.455Z",
          "contentId": 23,
          "tagId": 6
        }
      }
    ],
    "contentCategories": [
      {
        "id": 3,
        "name": "programming",
        "createdat": "2024-08-10T08:04:08.420Z",
        "updatedat": "2024-08-10T08:04:08.420Z",
        "ContentCategories": {
          "createdat": "2024-08-10T08:04:08.470Z",
          "updatedat": "2024-08-10T08:04:08.470Z",
          "contentId": 23,
          "categoryId": 3
        }
      }
    ]
  }
  }

  ]
  ```

  ```
  GET /api/content?page=1&limit=10
  ```

  Retrieve Content by pagination.

  Response:

  ```json
  [
    {
   "status": "success",
  "data": [
    {
      "id": 11,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:12:40.876Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:12:40.878Z",
      "updatedat": "2024-08-10T06:12:40.878Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 12,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:14:24.657Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:14:24.657Z",
      "updatedat": "2024-08-10T06:14:24.657Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 10,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:11:42.419Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:11:42.423Z",
      "updatedat": "2024-08-10T06:11:42.423Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 13,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:14:53.828Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:14:53.828Z",
      "updatedat": "2024-08-10T06:14:53.828Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 5,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:03:26.773Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:03:26.777Z",
      "updatedat": "2024-08-10T06:03:26.777Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 8,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:07:54.053Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:07:54.058Z",
      "updatedat": "2024-08-10T06:07:54.058Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 6,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:04:33.776Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:04:33.781Z",
      "updatedat": "2024-08-10T06:04:33.781Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 4,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T05:59:03.912Z",
      "lectureId": 3,
      "createdat": "2024-08-10T05:59:03.915Z",
      "updatedat": "2024-08-10T05:59:03.915Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 9,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:10:36.526Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:10:36.526Z",
      "updatedat": "2024-08-10T06:10:36.526Z",
      "contentTags": [],
      "contentCategories": []
    },
    {
      "id": 7,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": null,
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T06:05:12.646Z",
      "lectureId": 3,
      "createdat": "2024-08-10T06:05:12.650Z",
      "updatedat": "2024-08-10T06:05:12.650Z",
      "contentTags": [],
      "contentCategories": []
    }
  ],
  "pagination": {
    "currentPage": "1",
    "totalPages": 2,
    "totalItems": 20,
    "itemsPerPage": "10"
  }
  }

  ]
  ```
  
   ```
  GET /api/content/:id
  ```

  Retrieve Single Content.

  Response:

  ```json
  [
    {
   "status": "success",
  "data": {
    "id": 8,
    "title": "python basics",
    "description": "learn python basics",
    "contentType": "file",
    "contentUrl": null,
    "contentFile": null,
    "contentText": null,
    "uploadedBy": 1,
    "createdAt": "2024-08-10T06:07:54.053Z",
    "lectureId": 3,
    "createdat": "2024-08-10T06:07:54.058Z",
    "updatedat": "2024-08-10T06:07:54.058Z",
    "contentTags": [],
    "contentCategories": []
  }
  }

  ]
  ```

   ```
  PUT /api/content/:id
  ```

   ```
  DELETE /api/content/:id
  ```


  

   - **Tags endpoints**

  ```
  POST /api/tags/
  ```

  Create new tag.

  Request:

  ```json
  [
    {
  "name": "python"
  }

  ]
  ```

  Response:

  ```json
  [
    {
    "status": "success",
  "message": "Tag created successfully",
  "tag": {
    "id": 1,
    "name": "python",
    "updatedat": "2024-08-10T06:10:20.390Z",
    "createdat": "2024-08-10T06:10:20.390Z"
  }
  }

  ]
  ```

   ```
  GET /api/tags/
  ```

  Retrieve all tags.

  Response:

  ```json
  [
    {
   "status": "success",
  "message": "Tags fetched successfully",
  "tags": [
    {
      "id": 1,
      "name": "python",
      "createdat": "2024-08-10T06:10:20.390Z",
      "updatedat": "2024-08-10T06:10:20.390Z"
    },
    {
      "id": 2,
      "name": "backend",
      "createdat": "2024-08-10T06:12:40.937Z",
      "updatedat": "2024-08-10T06:12:40.937Z"
    }
  ]
  }

  ]
  ```

  ```
  GET /api/tags/content/tagName?page=1&limit=10
  ```

  Retrieve all Content by tags.

  Response:

  ```json
  [
    {
    "status": "success",
  "data": [
    {
      "id": 22,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": "https://res.cloudinary.com/dx0n30auq/image/upload/v1723277041/videos/c6jltisflyndwqrgrytm.png",
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T08:04:02.286Z",
      "lectureId": 3,
      "createdat": "2024-08-10T08:04:02.290Z",
      "updatedat": "2024-08-10T08:04:02.290Z",
      "contentTags": [
        {
          "id": 3,
          "name": "python",
          "createdat": "2024-08-10T08:04:02.321Z",
          "updatedat": "2024-08-10T08:04:02.321Z"
        }
      ],
      "contentCategories": [
        {
          "id": 2,
          "name": "programming",
          "createdat": "2024-08-10T08:04:02.325Z",
          "updatedat": "2024-08-10T08:04:02.325Z"
        }
      ]
    },
    {
      "id": 23,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": "https://res.cloudinary.com/dx0n30auq/image/upload/v1723277048/videos/d4uhatrhba3yyxj1ngbt.png",
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T08:04:07.418Z",
      "lectureId": 3,
      "createdat": "2024-08-10T08:04:07.431Z",
      "updatedat": "2024-08-10T08:04:07.431Z",
      "contentTags": [
        {
          "id": 5,
          "name": "python",
          "createdat": "2024-08-10T08:04:08.417Z",
          "updatedat": "2024-08-10T08:04:08.417Z"
        }
      ],
      "contentCategories": [
        {
          "id": 3,
          "name": "programming",
          "createdat": "2024-08-10T08:04:08.420Z",
          "updatedat": "2024-08-10T08:04:08.420Z"
        }
      ]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 2,
    "itemsPerPage": 10
  }
  }

  ]
  ```
   

   - **Category endpoints**
   ```
  GET /api/categories/content/categoryName?page=1&limit=10
  ```

  Retrieve all Content by category.

  Response:

  ```json
  [
    {
    "status": "success",
  "data": [
    {
      "id": 22,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": "https://res.cloudinary.com/dx0n30auq/image/upload/v1723277041/videos/c6jltisflyndwqrgrytm.png",
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T08:04:02.286Z",
      "lectureId": 3,
      "createdat": "2024-08-10T08:04:02.290Z",
      "updatedat": "2024-08-10T08:04:02.290Z",
      "contentTags": [
        {
          "id": 3,
          "name": "python",
          "createdat": "2024-08-10T08:04:02.321Z",
          "updatedat": "2024-08-10T08:04:02.321Z"
        }
      ],
      "contentCategories": [
        {
          "id": 2,
          "name": "programming",
          "createdat": "2024-08-10T08:04:02.325Z",
          "updatedat": "2024-08-10T08:04:02.325Z"
        }
      ]
    },
    {
      "id": 23,
      "title": "python basics",
      "description": "learn python basics",
      "contentType": "file",
      "contentUrl": "https://res.cloudinary.com/dx0n30auq/image/upload/v1723277048/videos/d4uhatrhba3yyxj1ngbt.png",
      "contentFile": null,
      "contentText": null,
      "uploadedBy": 1,
      "createdAt": "2024-08-10T08:04:07.418Z",
      "lectureId": 3,
      "createdat": "2024-08-10T08:04:07.431Z",
      "updatedat": "2024-08-10T08:04:07.431Z",
      "contentTags": [
        {
          "id": 5,
          "name": "python",
          "createdat": "2024-08-10T08:04:08.417Z",
          "updatedat": "2024-08-10T08:04:08.417Z"
        }
      ],
      "contentCategories": [
        {
          "id": 3,
          "name": "programming",
          "createdat": "2024-08-10T08:04:08.420Z",
          "updatedat": "2024-08-10T08:04:08.420Z"
        }
      ]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 2,
    "itemsPerPage": 10
  }
  }

  ]
  ```


  - **Notification endpoints**

   ```
  GET /api/notifications/:userId/:read:
  ```

  Retrieve All Notification By User Optional Query Parameter: ?read=true or ?read=false.

  Response:

  ```json
  [
    {
     "notifications": [
    {
      "id": 1,
      "userId": 1,
      "notificationType": "New Message",
      "notificationContent": {
        "body": "You have received a new message."
      },
      "read": false,
      "createdAt": "2024-08-11T12:34:56.000Z"
    },
    {
      "id": 2,
      "userId": 1,
      "notificationType": "Reminder",
      "notificationContent": {
        "body": "Your subscription is about to expire."
      },
      "read": false,
      "createdAt": "2024-08-10T08:45:12.000Z"
    }
  ]
  }

  ]
  ```

  ```
  POST /api/notifications/
  ```

  Send Notification to user.

  Response:

  ```json
  [
    {
    "userId": 1,
  "notificationType": "New Message",
  "notificationContent": {
    "body": "You have received a new message."
  },
  "fcmToken": "DEVICE_FCM_TOKEN"
  }

  ]
  ```

 ```
  PUT /api/notifications/:id/read
  ```

  Mark a specific notification as read.

  Response:

  ```json
  [
    {
   "message": "Notification marked as read.",
  "notification": {
    "id": 1,
    "userId": 1,
    "notificationType": "New Message",
    "notificationContent": {
      "body": "You have received a new message."
    },
    "read": true,
    "createdAt": "2024-08-11T12:34:56.000Z"
  }
  }

  ]
  ```

  








