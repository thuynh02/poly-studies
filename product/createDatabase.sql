-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 16, 2014 at 02:36 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`upload_id`, `survey_id`, `image_name`, `image_path`, `image_description`, `created`) VALUES
(9, 1, 'Coke', '1396543983coke.jpg', 'A can', 1396543983),
(10, 1, '1396543990ipad-mini.jpg', '1396543990ipad-mini.jpg', NULL, 1396543990),
(11, 1, '1396543994twitter.jpg', '1396543994twitter.jpg', NULL, 1396543994);

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
  PRIMARY KEY (`question_id`,`survey_id`,`question_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `survey_id`, `question_type`, `description`, `created`) VALUES
(0, 1, 'rating', '["usage","Have you ever had a [id]?"]', 1397606469),
(0, 1, 'survey', 'I describe myself as extraverted, enthusiastic.', 1397606469),
(1, 1, 'rating', '["familiarity-slider","On a scale of 1 - 10, how familiar are you with [id]?"]', 1397606469),
(1, 1, 'survey', 'I seldom feel blue.', 1397606469),
(2, 1, 'rating', '["opinion-star","On a scale of 1 (very negative) to 5 (very positive), what is your opinion of [id]?"]', 1397606469),
(2, 1, 'survey', 'I describe myself as critical, quarrelsome.', 1397606469),
(3, 1, 'rating', '["like-rating","Do you like [id]?"]', 1397606469),
(3, 1, 'survey', 'I describe myself as dependable, self-disciplined.', 1397606469),
(4, 1, 'survey', 'Please select option six, then write az in question 18.', 1397606469),
(5, 1, 'survey', 'I describe myself as anxious, easily upset.', 1397606469),
(6, 1, 'survey', 'I feel comfortable with myself.', 1397606469),
(7, 1, 'survey', 'I describe myself as open to new experiences, complex.', 1397606469),
(8, 1, 'survey', 'I look at the bright side of life.', 1397606469),
(9, 1, 'survey', 'I describe myself as reserved, quiet.', 1397606469),
(10, 1, 'survey', 'Please select option two.', 1397606469),
(11, 1, 'survey', 'I describe myself as sympathetic, warm.', 1397606469),
(12, 1, 'survey', 'I often feel blue.', 1397606469),
(13, 1, 'survey', 'I describe myself as disorganized, careless.', 1397606469),
(14, 1, 'survey', 'I describe myself as calm, emotionally stable.', 1397606469),
(15, 1, 'survey', 'I worry about things.', 1397606469),
(16, 1, 'survey', 'I describe myself as conventional, uncreative.', 1397606469);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `question_id` int(11) NOT NULL DEFAULT '0',
  `upload_id` int(11) NOT NULL,
  `survey_id` int(11) NOT NULL,
  `voters` int(11) DEFAULT NULL,
  `rating` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`question_id`,`upload_id`,`survey_id`),
  KEY `survey_id` (`survey_id`),
  KEY `upload_id` (`upload_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`question_id`, `upload_id`, `survey_id`, `voters`, `rating`) VALUES
(0, 9, 1, 12, 'yes'),
(0, 10, 1, NULL, NULL),
(0, 11, 1, NULL, NULL),
(1, 9, 1, 14, ''),
(1, 10, 1, NULL, NULL),
(1, 11, 1, NULL, NULL),
(2, 9, 1, 1, '4'),
(2, 10, 1, NULL, NULL),
(2, 11, 1, NULL, NULL),
(3, 9, 1, NULL, NULL),
(3, 10, 1, NULL, NULL),
(3, 11, 1, NULL, NULL);

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
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`),
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`survey_id`),
  ADD CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`upload_id`) REFERENCES `product_images` (`upload_id`);
