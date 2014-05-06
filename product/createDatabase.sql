-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 06, 2014 at 09:04 PM
-- Server version: 5.5.33
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `user_id` int(11) NOT NULL DEFAULT '0',
  `survey_id` int(11) NOT NULL,
  `survey_answers` text NOT NULL,
  `rating_answers` text,
  `created` int(11) DEFAULT NULL,
  KEY `survey_id` (`survey_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`user_id`, `survey_id`, `survey_answers`, `rating_answers`, `created`) VALUES
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"a"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":""}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az","timeElapsed":"-1515"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az","timeElapsed":"2464"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az","timeElapsed":"64052730"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az","timeElapsed":"23754"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az","timeElapsed":"134093"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az","timeElapsed":"1681"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az","timeElapsed":"7405"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"1","q18":"az","timeElapsed":"2781"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"1","q17":"2","q18":"","timeElapsed":"14042"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106),
(-1, 1, '{"age":"18","gender":"male","q1":"1","q2":"1","q3":"1","q4":"1","q5":"6","q6":"1","q7":"1","q8":"1","q9":"1","q10":"1","q11":"2","q12":"1","q13":"1","q14":"1","q15":"1","q16":"az","timeElapsed":"5452"}', '[{"imageID":"25","productName":"iPad Mini","productDesc":"","imagePath":"images/1398961739ipad-mini.jpg","questionTypes":["usage","opinion-star"],"questionValues":["yes",2.5],"voterRating":[{"questionID":"0","voters":"12","rating":"no"},{"questionID":"2","voters":"100","rating":"4"}]}]', 1399137106);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `upload_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_id` int(11) NOT NULL DEFAULT '0',
  `image_name` text,
  `image_path` text NOT NULL,
  `image_description` text,
  `created` int(11) DEFAULT NULL,
  PRIMARY KEY (`upload_id`,`survey_id`),
  KEY `survey_id` (`survey_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`upload_id`, `survey_id`, `image_name`, `image_path`, `image_description`, `created`) VALUES
(25, 1, 'iPad Mini', '1398961739ipad-mini.jpg', '', 1398961739);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL DEFAULT '0',
  `survey_id` int(11) NOT NULL,
  `question_type` varchar(10) NOT NULL,
  `description` text NOT NULL,
  `created` int(11) DEFAULT NULL,
  `hide` int(11) NOT NULL DEFAULT '0',
  `del` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`question_id`,`survey_id`,`question_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `survey_id`, `question_type`, `description`, `created`, `hide`, `del`) VALUES
(0, 1, 'rating', '["usage","Have you ever had a [id]?"]', 1398976416, 0, 0),
(0, 1, 'survey', 'I describe myself as extraverted, enthusiastic.', 1398976416, 0, 0),
(1, 1, 'rating', '["familiarity-slider","On a scale of 1 - 10, how familiar are you with [id]?"]', 1398976416, 1, 0),
(1, 1, 'survey', 'I seldom feel blue.', 1398976416, 1, 0),
(2, 1, 'rating', '["opinion-star","On a scale of 1 (very negative) to 5 (very positive), what is your opinion of [id]?"]', 1398976416, 0, 0),
(2, 1, 'survey', 'I describe myself as critical, quarrelsome.', 1398976416, 0, 0),
(3, 1, 'rating', '["like-rating","Do you like [id]?"]', 1398976416, 1, 0),
(3, 1, 'survey', 'I describe myself as dependable, self-disciplined.', 1398976416, 1, 0),
(4, 1, 'survey', 'Please select option six, then write az in the last question.', 1398976416, 0, 0),
(5, 1, 'survey', 'I describe myself as anxious, easily upset.', 1398976416, 0, 0),
(6, 1, 'survey', 'I feel comfortable with myself.', 1398976416, 0, 0),
(7, 1, 'survey', 'I describe myself as open to new experiences, complex.', 1398976416, 0, 0),
(8, 1, 'survey', 'I look at the bright side of life.', 1398976416, 0, 0),
(9, 1, 'survey', 'I describe myself as reserved, quiet.', 1398976416, 0, 0),
(10, 1, 'survey', 'Please select option two.', 1398976416, 0, 0),
(11, 1, 'survey', 'I describe myself as sympathetic, warm.', 1398976416, 0, 0),
(12, 1, 'survey', 'I often feel blue.', 1398976416, 0, 0),
(13, 1, 'survey', 'I describe myself as disorganized, careless.', 1398976416, 0, 0),
(14, 1, 'survey', 'I describe myself as calm, emotionally stable.', 1398976416, 0, 0),
(15, 1, 'survey', 'I worry about things.', 1398976416, 0, 0),
(16, 1, 'survey', 'I describe myself as conventional, uncreative.', 1398976416, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `question_id` int(11) NOT NULL DEFAULT '0',
  `upload_id` int(11) NOT NULL,
  `survey_id` int(11) NOT NULL,
  `voters` int(11) DEFAULT NULL,
  `rating` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`question_id`,`upload_id`,`survey_id`),
  KEY `survey_id` (`survey_id`),
  KEY `upload_id` (`upload_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`question_id`, `upload_id`, `survey_id`, `voters`, `rating`) VALUES
(0, 25, 1, 12, 'no'),
(1, 25, 1, 142, '0'),
(2, 25, 1, 100, '4'),
(3, 25, 1, 0, '["14","",""]');

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

CREATE TABLE `surveys` (
  `survey_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_name` varchar(255) NOT NULL,
  PRIMARY KEY (`survey_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`survey_id`, `survey_name`) VALUES
(1, 'Survey 2A');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`) VALUES
(-1, NULL, NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`upload_id`) REFERENCES `product_images` (`upload_id`) ON DELETE CASCADE;
