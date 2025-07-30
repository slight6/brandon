// Database configuration and connection
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || './database/handyman.db';

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

// Initialize database tables
const initDatabase = () => {
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    
    if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Remove comments and split by semicolon
        const cleanedSchema = schema
            .split('\n')
            .filter(line => !line.trim().startsWith('--') && line.trim() !== '')
            .join('\n');
        
        const statements = cleanedSchema
            .split(');')
            .filter(stmt => stmt.trim())
            .map(stmt => stmt.trim() + ');');
        
        statements.forEach((statement, index) => {
            if (statement.trim() && statement !== ');') {
                db.run(statement, (err) => {
                    if (err) {
                        console.error(`Error executing statement ${index + 1}:`, err.message);
                        console.error('Statement:', statement);
                    } else {
                        console.log(`Statement ${index + 1} executed successfully`);
                    }
                });
            }
        });
        
        // Wait a bit for tables to be created, then insert initial data
        setTimeout(() => {
            insertInitialServices();
            insertSampleTestimonials();
        }, 1000);
        
        console.log('Database initialization started');
    } else {
        console.error('Schema file not found');
    }
};

// Insert predefined services
const insertInitialServices = () => {
    const services = [
        // Handyman Services
        { category: 'handyman', name: 'Drywall repair', description: 'Professional drywall patching and repair services' },
        { category: 'handyman', name: 'Painting & touch-ups', description: 'Interior and exterior painting services' },
        { category: 'handyman', name: 'Furniture assembly', description: 'Expert furniture assembly and installation' },
        { category: 'handyman', name: 'Fence & deck (Installs & Repairs)', description: 'Fence and deck installation and repair services' },
        { category: 'handyman', name: 'Soffit & fascia repairs', description: 'Roof soffit and fascia maintenance and repair' },
        { category: 'handyman', name: 'Mailbox installs', description: 'Mailbox installation and replacement' },
        { category: 'handyman', name: 'Curtain & TV mounting', description: 'Professional mounting services for TVs and window treatments' },
        { category: 'handyman', name: 'Landscaping', description: 'Basic landscaping and yard maintenance' },
        { category: 'handyman', name: 'Sod installation', description: 'Fresh sod installation for lawns' },
        { category: 'handyman', name: 'Tree Trimming', description: 'Tree trimming and pruning services' },
        { category: 'handyman', name: 'Pick up and delivery services', description: 'Convenient pickup and delivery for your projects' },
        { category: 'handyman', name: 'Shutter installation/removal', description: 'Window shutter installation and removal' },
        { category: 'handyman', name: 'Property maintenance', description: 'Ongoing property maintenance services' },
        { category: 'handyman', name: 'Household repairs', description: 'General household repair services' },
        { category: 'handyman', name: 'Pressure washing', description: 'Exterior cleaning and pressure washing' },
        { category: 'handyman', name: 'Demolition', description: 'Safe demolition services' },
        { category: 'handyman', name: 'Gutter cleaning', description: 'Gutter cleaning and maintenance' },
        
        // Junk Removal Services
        { category: 'junk_removal', name: 'Garage & attic cleanouts', description: 'Complete garage and attic cleaning services' },
        { category: 'junk_removal', name: 'Appliance & furniture removal', description: 'Safe removal of old appliances and furniture' },
        { category: 'junk_removal', name: 'Yard debris & storm cleanup', description: 'Storm damage and yard debris removal' },
        { category: 'junk_removal', name: 'Construction debris', description: 'Construction and renovation debris removal' },
        { category: 'junk_removal', name: 'Estate & eviction clean outs', description: 'Complete property cleanout services' },
        { category: 'junk_removal', name: 'Storage clean outs', description: 'Storage unit and shed cleanout services' },
        { category: 'junk_removal', name: 'Fence haul away', description: 'Old fence removal and disposal' },
        { category: 'junk_removal', name: 'Old cars & trucks removal', description: 'Vehicle removal and disposal services' },
        { category: 'junk_removal', name: 'Property clean outs', description: 'Complete property cleaning and junk removal' }
    ];
    
    const insertService = db.prepare('INSERT OR IGNORE INTO services (category, name, description) VALUES (?, ?, ?)');
    
    services.forEach(service => {
        insertService.run(service.category, service.name, service.description);
    });
    
    insertService.finalize();
};

// Insert sample testimonials
const insertSampleTestimonials = () => {
    const testimonials = [
        {
            customer_name: 'Sarah Johnson',
            service_type: 'Drywall repair',
            rating: 5,
            comment: 'Brandon did an excellent job repairing the holes in our living room wall. You can\'t even tell there was damage! Professional, punctual, and reasonably priced.',
            is_featured: 1,
            is_approved: 1
        },
        {
            customer_name: 'Mike Rodriguez',
            service_type: 'Fence installation',
            rating: 5,
            comment: 'Outstanding work on our new privacy fence. Brandon was very communicative throughout the project and the quality exceeded our expectations.',
            is_featured: 1,
            is_approved: 1
        },
        {
            customer_name: 'Lisa Thompson',
            service_type: 'Junk removal',
            rating: 5,
            comment: 'Needed our garage cleaned out after years of accumulation. Brandon\'s team was efficient, respectful, and left everything spotless. Highly recommend!',
            is_featured: 1,
            is_approved: 1
        },
        {
            customer_name: 'David Chen',
            service_type: 'TV mounting',
            rating: 5,
            comment: 'Perfect TV installation! Brandon made sure everything was level and secure. Also helped with cable management. Very professional service.',
            is_featured: 0,
            is_approved: 1
        },
        {
            customer_name: 'Amanda Williams',
            service_type: 'Pressure washing',
            rating: 5,
            comment: 'Our driveway and house exterior look brand new! Brandon was thorough and took great care not to damage our landscaping. Great value for the money.',
            is_featured: 0,
            is_approved: 1
        }
    ];
    
    const insertTestimonial = db.prepare('INSERT OR IGNORE INTO testimonials (customer_name, service_type, rating, comment, is_featured, is_approved) VALUES (?, ?, ?, ?, ?, ?)');
    
    testimonials.forEach(testimonial => {
        insertTestimonial.run(
            testimonial.customer_name,
            testimonial.service_type,
            testimonial.rating,
            testimonial.comment,
            testimonial.is_featured,
            testimonial.is_approved
        );
    });
    
    insertTestimonial.finalize();
};

module.exports = {
    db,
    initDatabase
};
