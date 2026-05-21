const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the concept of smart devices and practical programming.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and core web technologies.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Students become organized program structuralists using procedural techniques.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Web Frontend Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on structural semantic construction and base client interaction styling scripts.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Introduces Object-Oriented paradigm concepts and structures.',
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development II',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Advanced production design strategies utilizing external data integration nodes.',
        completed: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const courseContainer = document.getElementById("courseContainer");
    const totalCreditsDisplay = document.getElementById("totalCredits");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function renderDisplayList(filteredSet) {
        // Purge layout container structural tree data elements
        courseContainer.innerHTML = "";

        filteredSet.forEach(course => {
            const blockDiv = document.createElement("div");
            blockDiv.classList.add("course-item");
            blockDiv.classList.add(course.completed ? "completed" : "incomplete");
            
            // Output layout matching content string text structure
            blockDiv.textContent = `${course.subject} ${course.number}`;
            courseContainer.appendChild(blockDiv);
        });

        // Compute runtime array accumulation values via a strict reduce function call path
        const calculatedSum = filteredSet.reduce((accumulator, item) => accumulator + item.credits, 0);
        totalCreditsDisplay.textContent = calculatedSum;
    }

    // Attach interaction processing routines to management filters buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            const captureMode = event.target.id;
            if (captureMode === "btnWdd") {
                renderDisplayList(courses.filter(entry => entry.subject === "WDD"));
            } else if (captureMode === "btnCse") {
                renderDisplayList(courses.filter(entry => entry.subject === "CSE"));
            } else {
                renderDisplayList(courses);
            }
        });
    });

    // Execute first data rendering loop phase
    renderDisplayList(courses);
});