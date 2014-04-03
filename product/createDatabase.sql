-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 03, 2014 at 06:01 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`upload_id`, `survey_id`, `image_name`, `image_path`, `image_description`, `created`) VALUES
(3, 1, 'iPad Mini', '1396327325ipad-mini.jpg', 'Hello-Ipad', 1396327325),
(4, 1, 'Coke', '1396388515coke.jpg', 'Hello-Coke', 1396388515);

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
(0, 1, 'rating', 'Have you ever had a [id]?', 1396492372),
(1, 1, 'rating', 'On a scale of 1 - 10, how familiar are you with [id]?', 1396492372),
(2, 1, 'rating', 'On a scale of 1 (very negative) to 5 (very positive), what is your opinion of [id]?', 1396492392);

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
(0, 3, 1, 123, 'yes'),
(0, 4, 1, 213, 'no'),
(1, 3, 1, 14, '6'),
(1, 4, 1, 421, '3'),
(2, 3, 1, 142, '4'),
(2, 4, 1, 421, '2');

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
