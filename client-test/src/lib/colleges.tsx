const institutions = [
  {
    "name": "A B R College of Engineering and Technology,  PIN-523230 (CC-HJ)"
  },
  {
    "name": "A G L Degree College S KOTA"
  },
  {
    "name": "A S R   HOMOEOPATHIC  MEDICAL COLLEGE "
  },
  {
    "name": "A V N (Arigi Veerunaidu) Science & Arts Degree College, Vizianagaram"
  },
  {
    "name": "A.B.R College of Education, Kanigiri"
  },
  {
    "name": "A.C.College of Law"
  },
  {
    "name": "A.C.Evening College"
  },
  {
    "name": "A.G.K.M.College, Sattenapalli"
  },
  {
    "name": "A.J. COLLEGE OF EDUCATION"
  },
  {
    "name": "A.J. KALASALA"
  },
  {
    "name": "A.K. VISHWANTHA REDDY DEGREE COLLEGE, MULKANOOR, BHEEMADEVARAPALLY"
  },
  {
    "name": "A.K.R.G. DEGREE COLLEGE"
  },
  {
    "name": "A.L.College of Education, Guntur"
  },
  {
    "name": "A.M. Linganna College of Education, Hindupur"
  },
  {
    "name": "A.M. Reddy Memorial College of Engineering and Technology, Vinukonda Road, Narasaraopet(Mandal), PIN-522601(CC-HM)"
  },
  {
    "name": "A.M.A.L. Degree College, Anakapalle"
  },
  {
    "name": "A.M.G. College of Education for Women"
  },
  {
    "name": "A.N.K. Degree College, Gorantla"
  },
  {
    "name": "A.N.R. COLLEGE"
  },
  {
    "name": "A.N.R. P.L. ARTS & SCIENCE COLLEGE"
  },
  {
    "name": "A.P.Residential Degree College"
  },
  {
    "name": "A.Q.J. Centre for P.G. Studies"
  },
  {
    "name": "A.Q.J. Degree College"
  },
  {
    "name": "A.S.D.Government Degree College for Women"
  },
  {
    "name": "A.S.Degree College Tugalli"
  },
  {
    "name": "A.S.M. College for Women, Fort Road, Warangal  506 002"
  },
  {
    "name": "A.S.N Pharmacy College, Tenali"
  },
  {
    "name": "A.S.N.Degree College for Women"
  },
  {
    "name": "A.V. College of Arts, Science & Commerce"
  },
  {
    "name": "A.V.M COLLEGE OF EDUCATION, NKREKAL"
  },
  {
    "name": "A.V.R. and V.P.R. Degree College"
  },
  {
    "name": "A1 Global Institute of Engineering & Technology, Markapur- 523316 (CC-7Y)"
  },
  {
    "name": "Aadhya Degree College"
  },
  {
    "name": "Aadhya Degree College for Women"
  },
  {
    "name": "Aadilakshmi college of Education"
  },
  {
    "name": "Aaditya Degree College, Nellore"
  },
  {
    "name": "Aakash Degree College, Nagarkurnool."
  },
  {
    "name": "AAR MAHAVEER ENGINEERING COLLEGE"
  },
  {
    "name": "AASHRITHA DEGREE COLLEGE (NARAYANKHED)"
  },
  {
    "name": "Aazad College of Education, Amaravathi"
  },
  {
    "name": "Abdul Kalam Institute of Technological Sciences"
  },
  {
    "name": "Abhinav Hi-Tech College of Engineering & Technology"
  },
  {
    "name": "ABHYASA WOMEN'S COLLEGE"
  },
  {
    "name": "ABHYUDAYA DEGREE COLLEGE"
  },
  {
    "name": "ABHYUDAYA DEGREE COLLEGE"
  },
  {
    "name": "Abhyudaya Mahila Degree College, Guntur"
  },
  {
    "name": "Abhyudaya Oriental College"
  },
  {
    "name": "ABM Degree College"
  },
  {
    "name": "ABN & PRR COLLEGE OF SCIENCE"
  },
  {
    "name": "ABV Government Degree College, Jangaon  506 167"
  },
  {
    "name": "Academy of Life Sciences (Nursing), Visakhapatnam"
  },
  {
    "name": "Academy of Management Studies"
  },
  {
    "name": "ACE Engineering college"
  },
  {
    "name": "ACHARYA B.ED. COLLEGE"
  },
  {
    "name": "Acharya College of Education, Kagithalagudem Village, Cumbum, Prakasam Dsitrict"
  },
  {
    "name": "Acharya College of Engineering, Badvel"
  },
  {
    "name": "Acharya Degree College"
  },
  {
    "name": "Acharya Degree College, D.No. 18-144/26, Dwarakapet Road, Opp. Fire Station, W.No. 18, Narsampet"
  },
  {
    "name": "Acharya Jayashankar Degree College (Narayankhed)"
  },
  {
    "name": "Acharya N.G.Ranga College of Education, Chilumuru"
  },
  {
    "name": "Acharya Nagarjuna University, Guntur"
  },
  {
    "name": "Acharya NG Ranga Agricultural University, Guntur"
  },
  {
    "name": "ACME Degree College"
  },
  {
    "name": "ACSR GOVERNMENT MEDICAL COLLEGE"
  },
  {
    "name": "ACTS Degree College (Ambedkar College of Tech. & Sci.)"
  },
  {
    "name": "Adam College of Education"
  },
  {
    "name": "Adarsa College of Education, Giddaluru"
  },
  {
    "name": "Adarsa College of Pharmacy, G.Kothapalli, Gokavaram (M), PIN- 533285(CC-PE)"
  },
  {
    "name": "Adarsa Degree College"
  },
  {
    "name": "Adarsh College of Engineering, NH-214, Chebrolu,PIN-533449  (CC-HN)"
  },
  {
    "name": "Adarsh College of Teacher Education, Mahabubnagar"
  },
  {
    "name": "ADARSH DEGREE COLLEGE ,PENDURTHI"
  },
  {
    "name": "Adarsh Degree College Chinamushidivada"
  },
  {
    "name": "Adarsh Hindi Maha Vidyalaya Degree College, Nizamabad (5001)"
  },
  {
    "name": "Adarsh Post Graduate College of Computer Sciences, Mahabubnagar"
  },
  {
    "name": "Adarsha College of Education, Narayanpet"
  },
  {
    "name": "Adarsha College of Nursing, Anantapur"
  },
  {
    "name": "Adarsha Degree & P.G College, Mahabubnagar"
  },
  {
    "name": "Adarsha Law College, Balasamudram, Hanamkonda, Warangal"
  },
  {
    "name": "Addanki Institute of Management & Science, Near Singara Konda, NRT Road,  North Addanki-523201  (CC-8D)"
  },
  {
    "name": "Adikavi Nannaya University, Rajahmundry, East Godawari"
  },
  {
    "name": "ADINARAYANA COLLEGE OF NURSING ANAKAPALLE VISAKHAPATNAM"
  },
  {
    "name": "ADITHE SATYANARAYANA PG COLLEGE(MBA)"
  },
  {
    "name": "Aditya College of Education, Yerragondapalem"
  },
  {
    "name": "ADITYA COLLEGE OF ENGINEERING & TECHNOLOGY"
  },
  {
    "name": "Aditya College of Engineering, ADB Road, Surampalem, PIN-533437(CC-MH)"
  },
  {
    "name": "Aditya College of Engineering, Madanapalle"
  },
  {
    "name": "Aditya College of Nursing, Kakinada"
  },
  {
    "name": "Aditya College of Pharmacy"
  },
  {
    "name": "Aditya Degree  and PG College for Women, Santinagar, Kakinada"
  },
  {
    "name": "ADITYA DEGREE AND PG COLLEGE"
  },
  {
    "name": "ADITYA DEGREE COLLEGE"
  },
  {
    "name": "ADITYA DEGREE COLLEGE"
  },
  {
    "name": "ADITYA DEGREE COLLEGE"
  },
  {
    "name": "ADITYA DEGREE COLLEGE BODASINGIPETA BONDAPALLI"
  },
  {
    "name": "ADITYA DEGREE COLLEGE BVM"
  },
  {
    "name": "Aditya Degree College for Women, Rajahmundry"
  },
  {
    "name": "ADITYA DEGREE COLLEGE ICHAPURAM"
  },
  {
    "name": "ADITYA DEGREE COLLEGE P.S.R COMPLEX VIZIANAGARAM"
  },
  {
    "name": "Aditya Degree College TPG"
  },
  {
    "name": "Aditya Degree College Tuni, East Godavari"
  },
  {
    "name": "Aditya Degree College, Gajuwaka"
  },
  {
    "name": "Aditya Degree College, Gopalapatnam, Visakhapatnam"
  },
  {
    "name": "ADITYA DEGREE COLLEGE, MULUGU"
  },
  {
    "name": "Aditya Degree College, Near RTC Complex, Vsp"
  },
  {
    "name": "ADITYA DEGREE COLLEGE, PALAKOL"
  },
  {
    "name": "Aditya Degree College, Santinagar, Kakinada"
  },
  {
    "name": "Aditya Degree College, Sondipudi"
  },
  {
    "name": "Aditya Degree College, Thadithota, Rajahmundry, EG Dist"
  },
  {
    "name": "Aditya Engineering College, Aditya Nagar, ADB Raod, Surampalem, PIN-533437(CC-A9)"
  },
  {
    "name": "ADITYA INSTITUTE OF TECHNOLOGY & MANAGEMENT, K.Kothuru, Tekkali - 532201, Srikakulam District, A.P(CC-A5)"
  },
  {
    "name": "Aditya Pharmacy College, Surampalem"
  },
  {
    "name": "Adoni Arts & Science College (PG), Adoni"
  },
  {
    "name": "Adusumilli Gopalakrishnaiah and sugarcane grower Siddhartha Degree College of Arts and Science, Vuyyuru"
  },
  {
    "name": "Agarala Eswsar Reddy MBA College, Ramapuram, Tirupati"
  },
  {
    "name": "Agnus Degree College,  Jainoor (V&M)"
  },
  {
    "name": "AGR College of Arts and Science Degree College"
  },
  {
    "name": "Agricultultural College, Bapatla"
  },
  {
    "name": "AGRICULTURAL COLLEGE ADILABAD    "
  },
  {
    "name": "AGRICULTURAL COLLEGE TORNALA    "
  },
  {
    "name": "Agricultural College, Aswaraopet"
  },
  {
    "name": "Agricultural College, Jagtial"
  },
  {
    "name": "Agricultural College, Mahanandi"
  },
  {
    "name": "Agricultural College, Naira"
  },
  {
    "name": "Agricultural College, Rajahmundry"
  },
  {
    "name": "Agricultural College, Sirsilla"
  },
  {
    "name": "AGRICULTURAL COLLEGE, WARANGAL"
  },
  {
    "name": "AGRICULTURAL POLYTECHNIC"
  },
  {
    "name": "Agriculture College, Palem"
  },
  {
    "name": "AGRICULTURE POLYTECHNIC RAMPACHODAVARAM"
  },
  {
    "name": "Ahmed College of Education, Bhiknoor (5295)"
  },
  {
    "name": "AIM BED COLLEGE"
  },
  {
    "name": "AIMS COLLEGE OF HOTEL MANAGEMENT  AND CATERING TECHNOLOGY"
  },
  {
    "name": "AIMS DEGREE COLLEGE"
  },
  {
    "name": "Aizza College of Engineering & Technology"
  },
  {
    "name": "AJK POLYTECHNIC OF SEED TECHNOLOGY"
  },
  {
    "name": "AJMERA REKHA SYAM (ARTS) DEGREE COLLEGE, PONKAL, JANNARAM, ADILABAD"
  },
  {
    "name": "AKLR Govt. Oriental College"
  },
  {
    "name": "AKM Oriental College"
  },
  {
    "name": "AKNU Campus, T.P.Gudem"
  },
  {
    "name": "AKNU M.S.N. CAMPUS, KKD"
  },
  {
    "name": "AKRG College of Pharmacy, Nallagerla PIN-534112(CC-8N)"
  },
  {
    "name": "Akshara College of Education, Gundlapalli Village, Maddipadu Mandal, Prakasam District"
  },
  {
    "name": "Akshara College of Education, Pamur, Prakasam District"
  },
  {
    "name": "AKSHARA DEGREE COLLEGE"
  },
  {
    "name": "AKSHARA DEGREE COLLEGE"
  },
  {
    "name": "AKSHARA DEGREE COLLEGE"
  },
  {
    "name": "Akshara Degree College for Women"
  },
  {
    "name": "Akshara Degree College, Pamuru"
  },
  {
    "name": "Akshara Institute of Management and Technology, Kotramangalam, Tirupati"
  },
  {
    "name": "Akshara Institute of Management Studies"
  },
  {
    "name": "Akshara Techno Degree College, Kasibugga"
  },
  {
    "name": "AKSHAY COLLEGE OF NURSING, KADAPA"
  },
  {
    "name": "AKSHAYA DEGREE COLLEGE"
  },
  {
    "name": "AKSHY COLLEGE OF MEDICAL LAB TECHNOLOGY"
  },
  {
    "name": "AKULA SREE RAMULU COLLEGE of EDUCATION Kovvur"
  },
  {
    "name": "AKULA SREERAMULU COLLEGE OF EDUCATION TANUKU."
  },
  {
    "name": "Al Ameer Institute of Management & Tech"
  },
  {
    "name": "AL Momin College of Education, Podili"
  },
  {
    "name": "AL RAHAMAN COLLEGE OF EDUCATION"
  },
  {
    "name": "Al-Madina College of Education, Mahabubnagar"
  },
  {
    "name": "AL-MADINA COLLEGE OF EDUCATION, NALGONDA"
  },
  {
    "name": "Al-Quarmoshi Institute of Business Management"
  },
  {
    "name": "ALETI RAJA REDDY DEGREE COLLEGE, VELAGTOOR."
  },
  {
    "name": "Alexa College of Education,Venkatachalam"
  },
  {
    "name": "ALEXANDER B.ED. COLLEGE"
  },
  {
    "name": "ALEXANDER COLLEGE, MUGDUMPOOR"
  },
  {
    "name": "ALEXANDER DEGREE COLLEGE"
  },
  {
    "name": "Ali College of Education"
  },
  {
    "name": "Ali Yavar Jung National Institute for the Hearing Handicapped"
  },
  {
    "name": "ALIMINETI MADHAVA REDDY MEMORIAL COLLEGE OF EDUCATION, CHOUTUPPAL"
  },
  {
    "name": "ALL INDIA INSTITUTE OF MEDICAL SCIENCE  BIBINAGAR"
  },
  {
    "name": "ALL INDIA INSTITUTE OF MEDICAL SCIENCES, MANGALAGIRI"
  },
  {
    "name": "All Saints Christian Law College"
  },
  {
    "name": "All Saints P.G. College"
  },
  {
    "name": "Allagadda Inst. Of Management & Science (PG), Allagadda"
  },
  {
    "name": "Allam Gurumurthy Lakshmibai Memorial College"
  },
  {
    "name": "ALLIANCE COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "Alluri Institute of Management Sciences, Hunter Road, Hanamkonda"
  },
  {
    "name": "ALNM Degree College for Women, Kanigiri, Prakasam District,523230"
  },
  {
    "name": "Alpha College of Education, Kanigiri"
  },
  {
    "name": "Alpha College of Education, Podili"
  },
  {
    "name": "Alpha Degree College Kanigiri"
  },
  {
    "name": "ALPHORES INSTITUTE OF MATHEMATICAL SCIENCES, VAVILALAPALLY, KARIMNAGAR"
  },
  {
    "name": "ALPHORES WOMENS DEGREE & PG COLLEGE JAGTIAL ROAD, KARIMNAGAR"
  },
  {
    "name": "Aluri College of Nursing, Ongole"
  },
  {
    "name": "Aluuri Seetharama Raju Academy of Medical Sceiences, Eluru"
  },
  {
    "name": "AM Reddy College of Education, Narasaraopeta"
  },
  {
    "name": "AM Reddy Memorial College of Pharmacy, Narasaraopeta"
  },
  {
    "name": "Aman Showkath B.Ed College, Isspalem, Narasaraopeta"
  },
  {
    "name": "AMAR COLLEGE OF BSC NURSING,AMARAVATHI"
  },
  {
    "name": "Amar College of Education"
  },
  {
    "name": "AMARA COLLEGE OF NURSING"
  },
  {
    "name": "AMARAVATHI BSC COLLEGE OF NURSING, ANANTHARAJUPET"
  },
  {
    "name": "American NRI College of Nursing, Visakhapatnam"
  },
  {
    "name": "AMG Degree College for Women, Chilakaluripeta"
  },
  {
    "name": "Amjad Ali Khan College of Business Administration"
  },
  {
    "name": "Amrat Kapadia Navajeevan Degree College for Women"
  },
  {
    "name": "Amrita Sai Institute of Science & Technology, Amrita Sai Nagar, Paritala (PO), Kanchikacherla (MD), PIN-521180  (CC-AJ)"
  },
  {
    "name": "AMRITA VISHWA VIDYAPEETHAM AMARAVATI CAMPUS"
  },
  {
    "name": "Amritha Akshitha College of Education, Metpally, Wanaparthy"
  },
  {
    "name": "Amrutha College of Education, Singarayakonda"
  },
  {
    "name": "AMRUTHA COLLEGE OF NURSING VISAKHAPATNAM"
  },
  {
    "name": "Amrutha Degree College, Singarayakonda"
  },
  {
    "name": "AMRUTHASRI COLLEGE OF NURSING"
  },
  {
    "name": "AMS Arts & Science College for Women"
  },
  {
    "name": "AMS College of Law College for Women"
  },
  {
    "name": "AMS School of Informatics"
  },
  {
    "name": "ANAM SANJEEVAREDDY DEGREE COLLEGE, ATMAKUR"
  },
  {
    "name": "Ananntha Law College"
  },
  {
    "name": "Anantalakshmi Govt. Ayurvedic College, Warangal"
  },
  {
    "name": "Anantha College of Law, Kesavayanagunta, Tirupati"
  },
  {
    "name": "ANANTHA DEGREE COLLEGE"
  },
  {
    "name": "Anantha Lakshmi Institute of Technology & Sciences"
  },
  {
    "name": "Anaya Degree College"
  },
  {
    "name": "Andhra Christian College, Guntur"
  },
  {
    "name": "ANDHRA COLLEGE OF NURSING ANKAPALLE"
  },
  {
    "name": "ANDHRA ENGINEERING COLLEGE"
  },
  {
    "name": "ANDHRA KESARI BED COLLEGE OF EDUCATION CHAKIRALA KANIGIRI"
  },
  {
    "name": "Andhra Kesari College of Education, Ongole"
  },
  {
    "name": "Andhra Kesari Degree College"
  },
  {
    "name": "ANDHRA KESARI UNIVERSITY"
  },
  {
    "name": "Andhra Kesari Vidya Kendram Degree College, Ongole"
  },
  {
    "name": "ANDHRA LOYOLA COLLEGE"
  },
  {
    "name": "Andhra Loyola Institute of Engineering & Technology, Polytechnic Post Office, Loyola Campus,Vijayawada, PIN-520008.  (CC-HP)"
  },
  {
    "name": "Andhra Mahila Sabha College of Teacher Education "
  },
  {
    "name": "Andhra Medical College, Visakhapatnam"
  },
  {
    "name": "Andhra Muslim College of Education, Guntur"
  },
  {
    "name": "Andhra Muslim College, Guntur"
  },
  {
    "name": "ANDHRA PRADESH FISHERIES UNIVERSITY"
  },
  {
    "name": "Andhra University College of Engineering(A)"
  },
  {
    "name": "Andhra University, Visakhapatnam"
  },
  {
    "name": "Andhra Womens Sanskrit College"
  },
  {
    "name": "Andhra Yuvathi Mandal School of Business for Women"
  },
  {
    "name": "Angel College of Nursing, Khammam"
  },
  {
    "name": "ANIL NEERUKONDA COLLEGE OF MEDICAL LAB TECHNOLOGY"
  },
  {
    "name": "ANIL NEERUKONDA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Anil Neerukonda Institute Of Technology & Sciences"
  },
  {
    "name": "ANILNEERUKONDA INSTITUTE OF DENTAL SCIENCES"
  },
  {
    "name": "ANISH DEGREE COLLEGE"
  },
  {
    "name": "Anitha Venkateswara College of Eduation, Tenali"
  },
  {
    "name": "Anjaneya degree College"
  },
  {
    "name": "Annabattuni Satyanarayana Degree College, Tenali"
  },
  {
    "name": "Annamacharya College of Education, Rajampeta"
  },
  {
    "name": "Annamacharya College of Pharmacy, Rajampet"
  },
  {
    "name": "Annamacharya Institute of Technology & Sciences"
  },
  {
    "name": "Annamacharya Institute of Technology & Sciences, New Boyanapalli, Rajampet"
  },
  {
    "name": "Annamacharya Institute of Technology & Sciences,Tirupati"
  },
  {
    "name": "Annamacharya Institute of Technology And Sciences, Chinthakomma Dinne"
  },
  {
    "name": "Annamacharya P.G. College of Computer Studies, Rajampet"
  },
  {
    "name": "ANNAPURNA DEGREE COLLEGE"
  },
  {
    "name": "ANNAPURNA MEMORIAL MODERN DEGREE COLLEGE"
  },
  {
    "name": "ANNIE BESANT WOMEN'S COLLEGE, SAROORNAGAR"
  },
  {
    "name": "Annie Besant Womens Degree College"
  },
  {
    "name": "Anniebesant College of Education, Kandukur"
  },
  {
    "name": "Anniebesant College of Education, Kranthi Nagar, Ballepally, Khammam"
  },
  {
    "name": "ANOOP DEGREE COLLEGE"
  },
  {
    "name": "Anu Bose Institute of Technology"
  },
  {
    "name": "Anuradha Memorial Degree College"
  },
  {
    "name": "Anurag College of Engineering"
  },
  {
    "name": "Anurag Degree & P.G College"
  },
  {
    "name": "ANURAG DEGREE COLLEGE SIRCILLA"
  },
  {
    "name": "ANURAG DEGREE COLLEGE SULTANABAD"
  },
  {
    "name": "Anurag Engineering College"
  },
  {
    "name": "Anurag Group of Institutions"
  },
  {
    "name": "Anurag Pharmcy College"
  },
  {
    "name": "ANURAG UNIVERSITY"
  },
  {
    "name": "Anwar Ul-Uloom College of Education"
  },
  {
    "name": "Anwar-Ul-Uloom College of Business Management"
  },
  {
    "name": "Anwarul -Uloom College of Pharmacy"
  },
  {
    "name": "Anwarul-Uloom College  (New Mallepally)"
  },
  {
    "name": "Anwarul-Uloom College of Computer Studies"
  },
  {
    "name": "Apex College of Nursing, Hyderabad"
  },
  {
    "name": "APOLLO COLLEGE OF NURSING"
  },
  {
    "name": "Apollo College of Nursing, Hyderabad"
  },
  {
    "name": "APOLLO COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Apollo College of Physiotherapy, Hyderabad"
  },
  {
    "name": "Apollo Institute of Hospital Administration"
  },
  {
    "name": "APOLLO INSTITUTE OF MEDICAL SCIENCES AND RESEARCH"
  },
  {
    "name": "APOLLO INSTITUTE OF MEDICAL SCIENCES AND RESEARCH"
  },
  {
    "name": "APOORVA COLLEGE OF EDUCATION (B.Ed)"
  },
  {
    "name": "APOORVA DEGREE COLLEGE, KARIMNAGAR"
  },
  {
    "name": "APOORVA INSTITUTE OF MANAGEMENT & SCIENCES, BHUPATHIPOOR"
  },
  {
    "name": "APOORVA WOMENS DEGREE COLLEGE"
  },
  {
    "name": "APPLE COLLEGE OF BSC NURSING "
  },
  {
    "name": "Aradhana College of Education"
  },
  {
    "name": "Aradhana School of Business Management"
  },
  {
    "name": "Aragonda Apollo College of Nursing, Aragonda"
  },
  {
    "name": "ARCHANA COLLEGE OF BSC MEDICAL LAB TECHNOLOGY"
  },
  {
    "name": "ARCHANA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "ARDENT DEGREE COLLEGE"
  },
  {
    "name": "Aristotle P.G.College"
  },
  {
    "name": "Arjun College of Technology & Science"
  },
  {
    "name": "Arkay College of Engineering & Technology"
  },
  {
    "name": "Army College of Dental Sciences, Secunderabad"
  },
  {
    "name": "ARORA DEGREE COLLEGE, MUKARAMPURA ,  KARIMNAGAR"
  },
  {
    "name": "ARUNDATHI COLLEGE OF BSC MLT "
  },
  {
    "name": "ARUNDATHI COLLEGE OF NURSING"
  },
  {
    "name": "ARUNDATHI COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "ARUNDATHI INSTITUTE OF MEDICAL SCIENCES"
  },
  {
    "name": "Arunodaya Degree College"
  },
  {
    "name": "ARUNODAYA DEGREE COLLEGE, NAKREKAL"
  },
  {
    "name": "Arya College of Pharmacy"
  },
  {
    "name": "Asha College of Education, Markapur"
  },
  {
    "name": "Ashok Institute of Engineering & Technology"
  },
  {
    "name": "ASHOK KUMAR REDDY BED COLLEGE"
  },
  {
    "name": "Ashoka Business School"
  },
  {
    "name": " ASHOKA COLLEGE OF EDUCATION"
  },
  {
    "name": "Ashoka Institute of Engineering AND Technology"
  },
  {
    "name": "ASHOKA SCHOOL OF PLANNING AND ARCHITECTURE"
  },
  {
    "name": "Ashoka Women's Engineering College, Kurnool"
  },
  {
    "name": "Ashritha Womens Degree College"
  },
  {
    "name": "ASIAN COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "ASR DEGREE COLLEGE"
  },
  {
    "name": "ASRAM College of Medical Lab Technology, Malkapuram"
  },
  {
    "name": "ASRAM College of Nursing, Eluru"
  },
  {
    "name": "ASRR Degree College, Pachikapallam, Rural"
  },
  {
    "name": "Aswini College of Nursing, Guntur"
  },
  {
    "name": "Atchuta Degree College"
  },
  {
    "name": "ATNs DEGREE COLLEGE, TIRUPATI Urban"
  },
  {
    "name": "Audisankara College of EducationNH-5, Bypass Road, Aravinda Nagar,Gudur"
  },
  {
    "name": "Audisankara College of Engineering  & Technology, Gudur"
  },
  {
    "name": "Aurobindo College of Business Management"
  },
  {
    "name": "Aurobindo Institute of Computer Science (Olive P.G College for Computer Science)"
  },
  {
    "name": "AURORA DEGREE COLLEGE, MEDIPALLY(WEST)"
  },
  {
    "name": "Aurora Degree College, Near KUC X Roads, Vidyaranyapuri, Hanamkonda"
  },
  {
    "name": "AURORA DESIGN ACADEMY"
  },
  {
    "name": "Aurora Higher Education and Research Academy"
  },
  {
    "name": "Aurora's  P.G. College (MCA), Ramanthapur"
  },
  {
    "name": "Aurora's Degree & PG College"
  },
  {
    "name": "AURORA'S DESIGN INSTITUTE"
  },
  {
    "name": "Aurora's Engineering College"
  },
  {
    "name": "Aurora's P.G. College (MBA), Ramanthapur"
  },
  {
    "name": "Aurora's P.G. College-MBA"
  },
  {
    "name": "Aurora's PG College (MBA), PANJAGUTTA"
  },
  {
    "name": "Aurora's PG College (MCA), NAMPALLY"
  },
  {
    "name": "Aurora's PG College MCA"
  },
  {
    "name": "Aurora's Scientific & Technological Research Academy"
  },
  {
    "name": "Aurora's Scientific and Technological Institute"
  },
  {
    "name": "AURORAS DEGREE AND PG COLLEGE, CHIKKADPALLY"
  },
  {
    "name": "Auroras Legal Sciences Academy"
  },
  {
    "name": "Avanthi Degree & P.G. College (MCA), Moosaramnagh"
  },
  {
    "name": "Avanthi Degree & PG college (MBA), MoosaramBagh"
  },
  {
    "name": "AVANTHI DEGREE AND PG COLLEGE"
  },
  {
    "name": "Avanthi Degree College"
  },
  {
    "name": "AVANTHI DEGREE COLLEGE"
  },
  {
    "name": "AVANTHI DEGREE COLLEGE"
  },
  {
    "name": "Avanthi Degree College, Adegaon-k, Echoda (V&M)"
  },
  {
    "name": "Avanthi Institute of Engineering & Technology"
  },
  {
    "name": "Avanthi Institute of Engineering & Technology, Tamaram Village, Makavarapalem mandal, Narsipatnam , Pin-531113. (CC-81)"
  },
  {
    "name": "Avanthi Institute of Engineering and Technology, Chirukupally(V), Bhogapuram(M), Near Tagarapuvalasa Bridge, PIN- 531 162 (CC-Q7)"
  },
  {
    "name": "Avanthi Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Avanthi Institute of Pharmaceutical Sciences, Bhogapuram(M), PIN-531162  (CC-T5)"
  },
  {
    "name": "Avanthi's PG & Research Academy"
  },
  {
    "name": "Avanthi's Research & Technological Academy, Basavapalem (V), Bhogapuram(M),  PIN-500034 (CC-HQ)"
  },
  {
    "name": "Avanthi's Scientific Technological & Research Academy"
  },
  {
    "name": "AVANTHI'S ST.THERESSA INSTITUTE OF ENGINEERING & TECHNOLOGY, Garbham Road, Garividi Village, Garividi Mandal, PIN -535101 (CC 99)"
  },
  {
    "name": "AVINASH COLLEGE OF COMMERCE "
  },
  {
    "name": "Avinash Degree College"
  },
  {
    "name": "AVINASH DEGREE COLLEGE, KOTHAPET"
  },
  {
    "name": "AVINASH DEGREE COLLEGE, KUKATPALLY"
  },
  {
    "name": "AVM College of Physiotherapy, Kadapa"
  },
  {
    "name": "AVM DEGREE COLLEGE, NAKREKAL"
  },
  {
    "name": "AVM PG COLLEGE, NAKREKAL"
  },
  {
    "name": "AVN Institute of Engineering & Technology"
  },
  {
    "name": "AVUTHU AMMI REDDY AND BONTHU MALLA REDDY"
  },
  {
    "name": "AVV Degree College, SVN Road, Warangal  506 002"
  },
  {
    "name": "Aware College of B.Sc MLT, Hyderabad"
  },
  {
    "name": "Aware College of Nursing, Hyderabad"
  },
  {
    "name": "Ayaan Institute of Medical Sciences"
  },
  {
    "name": "Ayesha College of Education, Nizamabad 5296"
  },
  {
    "name": "Ayushman Nursing College, Kurnool"
  },
  {
    "name": "AYYANNA DEGREE COLLEGE"
  },
  {
    "name": "AYYAPPA DEGREE COLLEGE, MPP ROAD, ELLANTHAKUNTA"
  },
  {
    "name": "AYYAPPA DEGREE COLLEGE, SIRCILLA"
  },
  {
    "name": "AYYAPPA DEGREE COLLEGE, VIDYANAGAR, NEAR SBH, SIRCILLA"
  },
  {
    "name": "Azaan College of Education, Rakasipet, Bodhan, Nizamabad (5292)"
  },
  {
    "name": "Azad College of Pharmacy"
  },
  {
    "name": "Azad Degree College"
  },
  {
    "name": "Azad Institute of Management"
  },
  {
    "name": "Azam Degree College"
  },
  {
    "name": "AZMEERA REKHA SHYAM DEGREE COLLEGE UTNOOR"
  },
  {
    "name": "Azmeera Rekha Syam (ARS) Degree College,Khanapur (V&M)"
  },
  {
    "name": "B A & K R College of Pharmacy, NH-5, Doddavarappadu (V), Ongole- 523002(CC-PG)"
  },
  {
    "name": "B R FISHERY POLYTECHNIC"
  },
  {
    "name": "B S BUGUDI BED COLLEGE"
  },
  {
    "name": "B. G. College of Education, Piduguralla"
  },
  {
    "name": "B.A & K.R College of Education, Medarametla, Ongole"
  },
  {
    "name": "B.A & K.R Degree College, Ongole"
  },
  {
    "name": "B.G.B.S. COLLEGE FOR WOMEN"
  },
  {
    "name": "B.J.T.DEGREE COLLEGE"
  },
  {
    "name": "B.M.Degree College, P.Dornala"
  },
  {
    "name": "B.R  College of Education, Pothuru, Naidupeta, Guntur"
  },
  {
    "name": "B.R.College of Education, Narsipatnam, Visakhapatnam"
  },
  {
    "name": "B.R.R. & G.K.R. CHAMBERS DEGREE COLLEGE"
  },
  {
    "name": "B.R.S.DEGREE COLLEGE"
  },
  {
    "name": "B.S. & J.R. DEGREE COLLEGE"
  },
  {
    "name": "B.S.R. Degree College"
  },
  {
    "name": "B.T. Government Degree College, Madanapalli"
  },
  {
    "name": "B.V Raju Institute of Technology"
  },
  {
    "name": "B.V. RAJU COLLEGE, VISHNUPUR, BHIMAVARAM"
  },
  {
    "name": "B.V.K.Degree College"
  },
  {
    "name": "BA&KR MCA&MBA College, NH-5, Doddavarappadu,  Ongole- 523211(CC-8R)"
  },
  {
    "name": "BABA Institute of Technology & Science, P.M. Palem, Bakkannapalem Village,  Madhurawada, PIN-530048 (CC-NR)"
  },
  {
    "name": "Babu Jagjivan Ram Govt. Degree College VITTALWADI HYDERABAD"
  },
  {
    "name": "BADAGALA SANKARA RAO DEGREE COLLEGE"
  },
  {
    "name": "Baddam Bal Reddy Institute of Technology and Business School"
  },
  {
    "name": "Badruka College of Commerce & Arts (Day)"
  },
  {
    "name": "Badruka College PG Centre"
  },
  {
    "name": "Badruka Degree College (AN)"
  },
  {
    "name": "Balaji  College of Pharmacy, Anantapur"
  },
  {
    "name": "Balaji College of education"
  },
  {
    "name": "Balaji College of Nursing"
  },
  {
    "name": "Balaji College of Nursing, Tirupati"
  },
  {
    "name": "Balaji Degree College, Nidubrolu, Ponnur"
  },
  {
    "name": "Balaji Inst. of Nursing, Warangal"
  },
  {
    "name": "Balaji Institute of I.T & Management"
  },
  {
    "name": "Balaji Institute of Management Sciences"
  },
  {
    "name": "Balaji Institute of Pharmaceutical Sciences, Laknepally (V), Narsampet (M), Warangal"
  },
  {
    "name": "Balaji Institute of Pharmacy, Laknepally (V), Narsampet (M), Warangal"
  },
  {
    "name": "Balaji Institute of Technology & Science"
  },
  {
    "name": "BALAJI MAHILA DEGREE AND PG COLLEGE"
  },
  {
    "name": "Balayesu Degree College, Hindupur"
  },
  {
    "name": "Bandari Srinivas Institute of Technology"
  },
  {
    "name": "Bapatla College of Arts & Science, Bapatla"
  },
  {
    "name": "BAPATLA COLLEGE OF PHARMACY,  BAPATLA-522101(CC-10)"
  },
  {
    "name": "Bapatla Engineering College, Bapatla"
  },
  {
    "name": "Bapatla Women's Engineering College, Bapatla"
  },
  {
    "name": "Basaveshwara Institute of Information Technology"
  },
  {
    "name": "Basi Reddy Memorial Degree College, Nandikotkur"
  },
  {
    "name": "BBCIT"
  },
  {
    "name": "BBH Degree College Vetapalem"
  },
  {
    "name": "BBM vaari Gayathri Degree College, Nehru Nagar, Khammam"
  },
  {
    "name": "BEHARA COLLEGE OF EDUCATION (B.Ed)"
  },
  {
    "name": "BEHARA COLLEGE OF ENGINEERING AND TECHNOLOGY    "
  },
  {
    "name": "BEHARA COLLEGE OF NURSING"
  },
  {
    "name": "BELLAMKONDA AGRICULTURAL POLYTECHNIC"
  },
  {
    "name": "BELLAMKONDA BED COLLEGE"
  },
  {
    "name": "Bellamkonda Degree College, C.S. Puram."
  },
  {
    "name": "BELLAMKONDA FISHERIES POLYTECHNIC"
  },
  {
    "name": "Bellamkonda Horticultural Polytechnic"
  },
  {
    "name": "Bellamkonda Institute of Technology & Science, Kambhalapadu, Podili-523240, (CC-PH)"
  },
  {
    "name": "Bellamkonda Sudha College of Education, Thripurapuram village, Giddalur, Prakasam District"
  },
  {
    "name": "Benaiah Christian College of Education"
  },
  {
    "name": "BETHANY COLLEGE OF EDUCATION"
  },
  {
    "name": "Bh.S.R. & V.L.M. DEGREE COLLEGE"
  },
  {
    "name": "BHADRUKA DEGREE COLLEGE"
  },
  {
    "name": "Bhadruka Degree College for Commerce & Business Management, Hanamkonda"
  },
  {
    "name": "Bhagawan Sri Satya SaiBaba Degree College, Tadikonda"
  },
  {
    "name": "BHAGEERATHA COLLEGE OF EDUCATION"
  },
  {
    "name": "Bhagyaradhi Degree College"
  },
  {
    "name": "Bharat Degree College for Women"
  },
  {
    "name": "Bharat Institute of Engineering & Technology"
  },
  {
    "name": "Bharat Institute of Technology"
  },
  {
    "name": "Bharat P.G. College for Women"
  },
  {
    "name": "BHARAT SCHOOL OF PHARMACY (FORMERLY) NAVA BHARAT INSTITUTE OF  PHARMACEUTICAL AND MEDICAL SCIENCES"
  },
  {
    "name": "Bharath College of Education"
  },
  {
    "name": "Bharath Educational Society Group of Insittutions, (Integrated Campus) Angllu"
  },
  {
    "name": "BHARATH REDDY COLLEGE OF MEDICAL LAB TECHNOLOGY"
  },
  {
    "name": "Bharathi College of Education, Nandyal"
  },
  {
    "name": "BHARATHI DEGREE COLLEGE"
  },
  {
    "name": "BHARATHI DEGREE COLLEGE (C CODE 4092)"
  },
  {
    "name": "Bharathi Degree College, Chirala"
  },
  {
    "name": "Bharathi Degree College, H.No. 11-27-16, Kothawada, Warangal"
  },
  {
    "name": "Bharathi Degree College, H.No. 4-4, Near Bus Stand, Wardhannapet, Warangal"
  },
  {
    "name": "BHARATHI INSTITUTE OF BUSINESS MANAGEMENT"
  },
  {
    "name": "BHARTIYA ENGINEERING SCIENCE AND TECHNOLOGY INNOVATION UNIVERSITY"
  },
  {
    "name": "Bhashyam College of Education, Guntur"
  },
  {
    "name": "Bhaskar Engineering College"
  },
  {
    "name": "BHASKAR INSTITUTE OF TECHNOLOGY AND SCIENCE"
  },
  {
    "name": "Bhaskar Law College"
  },
  {
    "name": "Bhaskar Medical College, Yenkapally"
  },
  {
    "name": "Bhaskar Pharmacy College"
  },
  {
    "name": "Bhaskara Degree College"
  },
  {
    "name": "Bhaskara Institute Of Pharmacy"
  },
  {
    "name": "BHAVANAMS DEGREE COLLEGE"
  },
  {
    "name": "Bhavani College Of Education"
  },
  {
    "name": "BHAVANI COLLEGE OF NURSING SURYAPET    "
  },
  {
    "name": "Bhavans New Science Degree College (AN)"
  },
  {
    "name": "Bhavans New Science Degree College (Day)"
  },
  {
    "name": "Bhavans Vivekananda College of Science, Humanities & Commerce"
  },
  {
    "name": "BHAVITHA DEGREE COLLEGE"
  },
  {
    "name": "BHAVITHA DEGREE COLLEGE DEVARAKADRA"
  },
  {
    "name": "Bhavitha Degree College, # 8-1-1/3, Shamshir Nagar, Ward No. 8, Bellampally"
  },
  {
    "name": "Bheema Institute of Technology & Sciences, Adoni"
  },
  {
    "name": "BHEEMESWAR DEGREE COLLEGE PUTHALAPATTU"
  },
  {
    "name": "Bheemi Reddy Institute of Management Science, Adoni"
  },
  {
    "name": "BHH Degree College for Women, Guntur"
  },
  {
    "name": "Bhimavaram Institute of Engineering & Technology, Swamy Gnananadha Ashram Road, Pennada, Bhimavaram , PIN - 534243(CC-AP)"
  },
  {
    "name": "Bhoj Reddy Engineering College for Women"
  },
  {
    "name": "BHONGIR COLLEGE OF EDUCAITON BHONGIR"
  },
  {
    "name": "BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE PILANI,HYDERABAD CAMPUS"
  },
  {
    "name": "Bishop Azaraiah Degree College, Dornakal, Warangal District"
  },
  {
    "name": "BIT Insitute of Technology,  (F3) Hindupur"
  },
  {
    "name": "Bless College of Nursing, Tirupati"
  },
  {
    "name": "Blooms College of Hotel Management"
  },
  {
    "name": "Blossom Degree College,  Mulakalacheruvu, Chittoor Dist  Rural"
  },
  {
    "name": "Blue Moon Degree College, Kadiri"
  },
  {
    "name": "BMR Degree College (Gajwel)"
  },
  {
    "name": "BMR Degree College (Siddipet)"
  },
  {
    "name": "BMRM Jhansi B.Ed College, Darsi"
  },
  {
    "name": "BOGGAVARAPU GURAVAIAH COLLEGE OF PHYSICAL EDUCATION VELPUR ATCHAMPET PALNADU DISTRICT"
  },
  {
    "name": "Boggavarapu Guravaiah Degree College, Velpur"
  },
  {
    "name": "Bojjam Narasimhulu Pharmacy College for Women"
  },
  {
    "name": "Bollineni College of Nursing, Nellore"
  },
  {
    "name": "BOLLINENI MEDSKILLS BSC PARAMEDICAL COLLEGE "
  },
  {
    "name": "Bomma Institute of Pharmacy"
  },
  {
    "name": "Bomma Institute of Technology Science"
  },
  {
    "name": "Bonam Venkata Chalamaiah Engineering College"
  },
  {
    "name": "Bonam Venkata Chalamayya Institute  of Technology and Science, Batlapalem"
  },
  {
    "name": "BR AND DHANALAKSHMI POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "BR INSTITUTE OF TECHNOLOGY AND MANAGEMENT SCIENCES, YANAMADALA, GUNTUR DISTRICT"
  },
  {
    "name": "BR POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "Bright Institute of Management"
  },
  {
    "name": "Brilliant  Grammar School Educational Society's Group of Institutions- Integrated Campus"
  },
  {
    "name": "BRILLIANT DEGREE COLLEGE, SBH LANE, SIRCILLA"
  },
  {
    "name": "Brilliant Institute of Engineering & Technology"
  },
  {
    "name": "Brilliant Minds And Resources College of Education"
  },
  {
    "name": "Brindavan Institute of Teacher Education"
  },
  {
    "name": "BRINDAVAN INSTITUTE OF TECHNOLOGY & SCIENCE"
  },
  {
    "name": "Browns College of Education, Ammapalem, Thanikella, Khammam"
  },
  {
    "name": "Browns College of Pharmacy, Ammapalem, Thanikella, Khammam"
  },
  {
    "name": "BRUNDAVAN B.ED. COLLEGE, ALLAGADDA"
  },
  {
    "name": "BRUNDAVAN DEGREE COLLEGE, DORNIPADU"
  },
  {
    "name": "BS & JR COLLEGE OF EDUCATION"
  },
  {
    "name": "BSC COLLEGE OF NURSING MUSLIM MATERNITY AND ZANANA HOSPITAL"
  },
  {
    "name": "BSNM College of Education"
  },
  {
    "name": "BSR COLLEGE OF EDUCATION  PAMUR PRAKASAM DISTRICT"
  },
  {
    "name": "BSR Degree College, Thatithopu, Tirupati Urban"
  },
  {
    "name": "Buchepalli Venkayamma Subbareddy Engineering College, Ongole-Kurnool Road, Chimakurthy-523 226,(CC-HR)"
  },
  {
    "name": "BVC College of Engineering, Palacharla, Rajanagaram Mandal, PIN-533104(CC-6M)"
  },
  {
    "name": "BVK B P ED COLLEGE (KONDAPAK)"
  },
  {
    "name": "BVRIT Hyderabad College of Engineering for women."
  },
  {
    "name": "BVSPM Degree College, Ongole"
  },
  {
    "name": "C V RAMAN PG COLLEGE MANCHERIAL    "
  },
  {
    "name": "C.B.R.Degree College"
  },
  {
    "name": "C.Gangi Reddy Degree College"
  },
  {
    "name": "C.L.R.Degree College, Cumbum, Prakasam District"
  },
  {
    "name": "C.Laxma Reddy College of Education, Telkapally"
  },
  {
    "name": "C.N.R. Degree College"
  },
  {
    "name": "C.N.R.DEGREE COLLEGE,GUDIPALA"
  },
  {
    "name": "C.R. College, Nadendla"
  },
  {
    "name": "C.R.Reddy Degree College"
  },
  {
    "name": "C.S.I. Institute of P.G. Studies"
  },
  {
    "name": "C.S.R. Sarma College, Ongole"
  },
  {
    "name": "C.S.T.S. GOVT. KALASALA"
  },
  {
    "name": "C.V RAMAN DEGREE COLLEGE MAKTHAL"
  },
  {
    "name": "C.V. Raman Degree College, Hanuman Nagar, Mancherial"
  },
  {
    "name": "CAPITAL DEGREE COLLEGE, L B NAGAR"
  },
  {
    "name": "Care College of Nursing, Hyderabad"
  },
  {
    "name": "Care College of Pharmacy, Oglapur (V), Athmakur (M), Warangal"
  },
  {
    "name": "Care Degree College, Nizamabad (5002)"
  },
  {
    "name": "CARE DENTAL COLLEGE"
  },
  {
    "name": "Care Institute of Medical Sciences College of Physiotherapy, Hyderabad"
  },
  {
    "name": "Care Nampally College of Nursing, Hyderabad"
  },
  {
    "name": "Care Waltair College of Nursing, Visakhapatnam"
  },
  {
    "name": "CARE YOGA NATUROPATHY MEDICAL COLLEGE"
  },
  {
    "name": "Career Degree College, Guntur"
  },
  {
    "name": "Carlo Bovini Memorial Degeree College, Kalwakurthy"
  },
  {
    "name": "CAT Degree College"
  },
  {
    "name": "Catherine College of Education"
  },
  {
    "name": "Central Research Institute of Unani Medicine"
  },
  {
    "name": "CENTRAL TRIBAL UNIVERSITY"
  },
  {
    "name": "CENTRAL UNIVERSITY OF ANDHRA PRADESH"
  },
  {
    "name": "Centre for Cellular and Molecular Biology (CCM)"
  },
  {
    "name": "CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT"
  },
  {
    "name": "CH. S.D. ST. THERESA'S COLLEGE FOR WOMEN (A)"
  },
  {
    "name": "Chadalawada Ramanamma Engineering College , Tirupati"
  },
  {
    "name": "CHAITANYA (DEEMED TO BE UNIVERSITY)"
  },
  {
    "name": "Chaitanya Bharathi Degree College, Chirala"
  },
  {
    "name": "CHAITANYA BHARATHI DEGREE COLLEGE, HUZURNAGAR"
  },
  {
    "name": "Chaitanya Bharathi Degree College, Venkatachalam"
  },
  {
    "name": "Chaitanya Bharathi Institute of Technology"
  },
  {
    "name": "Chaitanya Bharathi Institute of Technology, Proddutur"
  },
  {
    "name": "Chaitanya College of B.Sc Nursing, Ongole"
  },
  {
    "name": "CHAITANYA COLLEGE OF EDUCATION"
  },
  {
    "name": "CHAITANYA COLLEGE OF EDUCATION"
  },
  {
    "name": "Chaitanya College of Education, Markapur"
  },
  {
    "name": "Chaitanya College of Education, Parawada, Vsp"
  },
  {
    "name": "Chaitanya College of Pharmacy, Devarajugattu (Vill), Near Markapur Town, PIN- 523316  (CC-8C)"
  },
  {
    "name": "CHAITANYA DEGREE & PG COLLEGE"
  },
  {
    "name": "Chaitanya Degree & PG College for Women"
  },
  {
    "name": "CHAITANYA DEGREE COLLEGE"
  },
  {
    "name": "CHAITANYA DEGREE COLLEGE"
  },
  {
    "name": "Chaitanya Degree College"
  },
  {
    "name": "CHAITANYA DEGREE COLLEGE (SHAMSHABAD)"
  },
  {
    "name": "Chaitanya Degree college, Achampet"
  },
  {
    "name": "CHAITANYA DEGREE COLLEGE, CHEVELLA"
  },
  {
    "name": "Chaitanya Degree College, College Road, Mancherial"
  },
  {
    "name": "Chaitanya Degree College, S.Kota, Vizianagaram."
  },
  {
    "name": "CHAITANYA DEGREE COLLEGE-PAMARRU"
  },
  {
    "name": "Chaitanya Engineering College, Chaitanya Valley, Kommadi, Madhurawada,Pin-530041(CC-L6)"
  },
  {
    "name": "Chaitanya Institute of Pharmaceutical Sciences, Rampur (V), Dharmasagar (M), Warangal"
  },
  {
    "name": "Chaitanya Institute of Science & Technology, Madhavapatnam, Samaklkot (Mandal), near Kakinada, PIN-533005(CC-S0)"
  },
  {
    "name": "Chakradhar Degree College, Macherla"
  },
  {
    "name": "Chalapathi Degree College, Lam"
  },
  {
    "name": "Chalapathi Institute of Engineering & Technology, Lam"
  },
  {
    "name": "Chalapathi Institute of Pharmaceutical Sciences, Lam"
  },
  {
    "name": "Chalapathi Institute of Technology, A.R.Nagar, Amaravathi Road, Mothadaka, Tadikonda(Md), PIN-522016  (CC-HT)"
  },
  {
    "name": "CHALLENGERS DEGREE COLLEGE"
  },
  {
    "name": "Chalmeda Ananda Rao Institute of Medical Sciences, College of Nursing,Bommakal"
  },
  {
    "name": "Chalmeda Ananda Rao Institute of Medical Sciences, Karimnagar"
  },
  {
    "name": "CHANAKYA COLLEGE OF EDUCATION"
  },
  {
    "name": "CHANAKYA DEGREE & PG COLLEGE, NEAR CITY CABLE, JAMMIKUNTA"
  },
  {
    "name": "Chanakya Degree College, # 20-139 & 140, College Road, Mancherial"
  },
  {
    "name": "Chanakya Degree College, # 5-11-732 (New), Priyadarshini Nagar, Nirmal"
  },
  {
    "name": "CHANAKYA DEGREE COLLEGE, NEAR CITY CABLE, JAMMIKUNTA"
  },
  {
    "name": "Chanakya Degree College,Mallapur"
  },
  {
    "name": "Chanakya Institute of Hotel Management and Catering Technology"
  },
  {
    "name": "Chandana B.Sc Medical Lab Technology, Nalgonda"
  },
  {
    "name": "Chandana College of Nursing, Suryapet"
  },
  {
    "name": "CHANDANA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "CHANDANA DEGREE COLLEGE, BAZARHATHNOOR"
  },
  {
    "name": "CHANDANA POST BASIC BSC NURSING COLLEGE"
  },
  {
    "name": "CHANDRA COLLEGE OF NURSING"
  },
  {
    "name": "Chandra Kala Devi Sarda Degree College"
  },
  {
    "name": "Chanikya College of Education (B.Ed) Sri Bramaramba Mallikarjuna Eduational Society, Giddalur, Prakasam District - 523357"
  },
  {
    "name": "Chatrapathi Degree College"
  },
  {
    "name": "Chatrapathi Shivaji Degree College"
  },
  {
    "name": "Chebrolu Hanumaiah Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Chegireddy Linga Reddy Instt of Management, Cumbum"
  },
  {
    "name": "CHEGONDI  POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "CHENNIAS AMIRTA INSTITUTE OF HOTEL MANAGEMENT"
  },
  {
    "name": "Chillukur Balaji College of Pharmacy"
  },
  {
    "name": "CHINMAY CHANDRAMATHI COLLEGE OF EDUCAITON, DEVARAKONDA"
  },
  {
    "name": "CHIRALA COLLEGE OF NURSING"
  },
  {
    "name": "Chirala Engineering College, Ramapuram, Beach Road, Chirala, PIN-523157 (CC-E9)"
  },
  {
    "name": "Chiranjeevi Reddy Institute of Engineering and Technology, Anantapur"
  },
  {
    "name": "Chiristian Women's Degree College, Nallapadu, Guntur"
  },
  {
    "name": "Christ College Of Education"
  },
  {
    "name": "Christian College of Education, Madanapalli"
  },
  {
    "name": "Christu Jyothi Institute of Technology & Sciences"
  },
  {
    "name": "CILRD AND M DEGREE COLLEGE, VINUKONDA"
  },
  {
    "name": "CITY MAHILA DEGREE COLLEGE"
  },
  {
    "name": "CKM Arts & Science College(PG), Desaipet, Warangal"
  },
  {
    "name": "CKM Arts & Science College, Desaipet Road, Warangal  506 006"
  },
  {
    "name": "CKS Teja Institute of Dental Sciences & Research, Tirupati"
  },
  {
    "name": "CLUSTER UNIVERSITY"
  },
  {
    "name": "CMI Degree College, Anantapur"
  },
  {
    "name": "CMR College of Engineering & Technology"
  },
  {
    "name": "CMR COLLEGE OF NURSING"
  },
  {
    "name": "CMR College of pharmacy"
  },
  {
    "name": "CMR COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "CMR Engineering College"
  },
  {
    "name": "CMR INSTITUTE OF HEALTH SCIENCES"
  },
  {
    "name": "CMR INSTITUTE OF MEDICAL SCIENCES"
  },
  {
    "name": "CMR Institute of Technology"
  },
  {
    "name": "CMR Technical Campus"
  },
  {
    "name": "CMS Degree College"
  },
  {
    "name": "CNR Arts & Science College, Piler Rural"
  },
  {
    "name": "COGNOS INSTITUTE OF HOTEL MANAGEMENT"
  },
  {
    "name": "College of Agricultural Engineering and Technology, Sangareddy"
  },
  {
    "name": "College of Agricultural Engineering, Bapatla"
  },
  {
    "name": "College of Agricultural Engineering, Madakasira"
  },
  {
    "name": "College of Agriculture, Rajendranagar"
  },
  {
    "name": "College of Arts & Commerce"
  },
  {
    "name": "College of Dairy Technology, Tirupati"
  },
  {
    "name": "COLLEGE OF DEFENCE MANAGEMENT"
  },
  {
    "name": "College of Engineering for Women"
  },
  {
    "name": "COLLEGE OF FINE ARTS"
  },
  {
    "name": "COLLEGE OF FINE ARTS "
  },
  {
    "name": "College of Fishery Science, Muthukur"
  },
  {
    "name": "COLLEGE OF FISHERY SCIENCE, NARASAPURAM"
  },
  {
    "name": "College of Food Science and Technology, Bapatla"
  },
  {
    "name": "College of Food Science and Technology, Pulivendula"
  },
  {
    "name": "College of Food Science and Technology, Rudrur"
  },
  {
    "name": "College of Home Science"
  },
  {
    "name": "College of Home Science, Hyderabad"
  },
  {
    "name": "College of Horticulture, Anantharajupet"
  },
  {
    "name": "College of Horticulture, Chinalataripi"
  },
  {
    "name": "College of Horticulture, Parvathipuram"
  },
  {
    "name": "College of Horticulture, Venkataramannagudem"
  },
  {
    "name": "College of Languages"
  },
  {
    "name": "College of Life Sciences, Visakhapatnam"
  },
  {
    "name": "College of Nursing"
  },
  {
    "name": "College of Pharmaceutical Sciences"
  },
  {
    "name": "College of Science & Technology"
  },
  {
    "name": "College of Teacher Education (Tribal Welfare), Bhadrachalam"
  },
  {
    "name": "College of Teacher Education (Tribal Welfare), Lalctekdi, Utnoor"
  },
  {
    "name": "College of Teacher Education, Lashkar Bazar, Hanamkonda"
  },
  {
    "name": "COLLEGE OF VETERINARY SCIENCE, GARIVIDI"
  },
  {
    "name": "College of Veterinary Science, Korutla"
  },
  {
    "name": "College of Veterinary Science, Proddutur"
  },
  {
    "name": "College of Veterinary Science, Tirupati"
  },
  {
    "name": "CORAMANDAL COLLEGE OF EDUCATION, MEDIKONDURU"
  },
  {
    "name": "Creative Educational Society's College of Pharmacy, Kurnool"
  },
  {
    "name": "CRESCENT COLLEGE OF EDUCATION , MUKARAMPURA, KARIMNAGAR"
  },
  {
    "name": "Crescent College of Nursing, Kadapa"
  },
  {
    "name": "CRIMSON INSTITUTE OF TECHNOLOGY"
  },
  {
    "name": "CSI College of Education"
  },
  {
    "name": "CSI Degree College, Nizamabad (5004)"
  },
  {
    "name": "CSI WESLEY INSTITUTE OF TECHNOLOGY AND SCIENCES"
  },
  {
    "name": "CSIIT COLLEGE OF ARCHITECTURE"
  },
  {
    "name": "CSIRD Institute of Management, Gooty"
  },
  {
    "name": "CSSR & SRRM Degree & PG College, Kamalapuram"
  },
  {
    "name": "Culinary Academy of India"
  },
  {
    "name": "CULINARY GURU INSTITUTE OF HOTEL MANAGEMENT"
  },
  {
    "name": "CVM College of Pharmacy"
  },
  {
    "name": "CVR College of Engineering"
  },
  {
    "name": "CVRRM Degree College, V.Kota Rural"
  },
  {
    "name": "CVS Krishna Teja College of Education, Renigunta Road, Tirupati"
  },
  {
    "name": "D J R College of Engineering & Technology, DJR Nagar, N.H.5, Velpur (V), Via Gudavalli, Vijayawada, PIN- 521 104(CC-7K)"
  },
  {
    "name": "D Narayana Reddy Degree College"
  },
  {
    "name": "D.A.R. COLLEGE"
  },
  {
    "name": "D.C.R.M.Pharmacy College, Gangavaran Road, Inkollu Pin-523167(CC-Z4)"
  },
  {
    "name": "D.K. Govt. College for Women, Nellore"
  },
  {
    "name": "D.L.R.Degree College"
  },
  {
    "name": "D.N.R COLLEGE OF LAW"
  },
  {
    "name": "D.N.R. (A) COLLEGE"
  },
  {
    "name": "D.N.R. College of Engineering & Technology, Balusumudi, Bhimavaram- 534 202,(CC-9P)"
  },
  {
    "name": "D.N.R. GOVT. DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "D.R.G. DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "D.R.G.Govt.Degree College"
  },
  {
    "name": "D.R.N. DEGREE COLLEGE"
  },
  {
    "name": "D.R.W. College, Gudur"
  },
  {
    "name": "D.S.Govt. Degree College for Women, Ongole"
  },
  {
    "name": "D.S.R. HINDU COLLEGE OF LAW"
  },
  {
    "name": "D.V.M Degree College of Commerce & Science"
  },
  {
    "name": "D.V.R. DEGREE COLLEGE"
  },
  {
    "name": "DADI Institute of Engineering & Technology, Nh-5, Gavarapalem, Anakapalle-531002, (CC-U4)"
  },
  {
    "name": "Dadi Veeru Naidu Degree College"
  },
  {
    "name": "Daita Madhusudana Sastry Sri Venkateswara Hindu College of Engineering"
  },
  {
    "name": "Damisetty Bala Suresh Institute of Technology, Kavali"
  },
  {
    "name": "Damodaram Sanjivayya National Law University"
  },
  {
    "name": "Daripally Anantharamulu College of Engineering & Technology"
  },
  {
    "name": "David Memorial College of Education for Women"
  },
  {
    "name": "DAVID MEMORIAL COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "David Memorial Degree College"
  },
  {
    "name": "David Memorial Institute of Management"
  },
  {
    "name": "DAW Degree College"
  },
  {
    "name": "DBB Institute of PG Studies, Puttur"
  },
  {
    "name": "DBHP SABHA COLLEGE OF EDUCATION, HYDERABAD "
  },
  {
    "name": "DBHPSabha Dr.M.S.College of education"
  },
  {
    "name": "DCMS College of Physiotherapy, Hyderabad"
  },
  {
    "name": "DCRM Degree College, Inkollu"
  },
  {
    "name": "DCRM P.G College, MBA, Inkollu"
  },
  {
    "name": "DDR College of Education, Saraswathi Nagar, Nellore"
  },
  {
    "name": "DDR College of Para Medical Sceinces, Visakhapatnam"
  },
  {
    "name": "Deccan College of Education"
  },
  {
    "name": "Deccan College of Engineering & Technology"
  },
  {
    "name": "Deccan College of Medical Sciences, Hyderabad"
  },
  {
    "name": "DECCAN SCHOOL OF ARCHITECTURE AND PLANNING"
  },
  {
    "name": "Deccan School of Management"
  },
  {
    "name": "DECCAN SCHOOL OF PHARMACY"
  },
  {
    "name": "Deeksha Degree College, # 1-4-125/5, Adarsha Nagar, Siddapur Road, Nirmal"
  },
  {
    "name": "DEEKSHITHA B.Ed COLLEGE"
  },
  {
    "name": "DEEKSHITHA COLLEGE OF EDUCATION"
  },
  {
    "name": "DEEKSHITHA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Deepthi College of Nursiing, Nalgonda"
  },
  {
    "name": "Deepthi college of Nursing"
  },
  {
    "name": "Deepthi Degree College, Mamidikuduru"
  },
  {
    "name": "Devathi Venkata Subbaiah Degree College"
  },
  {
    "name": "Devathi Venkata Subbiah College of Education, Darsi"
  },
  {
    "name": "Devi College of Medical Lab Technology, Hyderabad"
  },
  {
    "name": "DEVI DEGREE COLLEGE FOR WOMEN VEMPALLI"
  },
  {
    "name": "DEVNAR DEGREE COLLEGE FOR BLIND"
  },
  {
    "name": "Devs College of Nursing, Keesara"
  },
  {
    "name": "Devs Homoeopathy Medical College & Hospital, Keesara"
  },
  {
    "name": "Dewan Bahadur Padma Rao Modiliar Degree College for Women"
  },
  {
    "name": "DHANALAKSHMI COLLEGE OF EDUCATION , MUPPALLA"
  },
  {
    "name": "Dhanalakshmi College of Physical Education Muppalla, Guntur District"
  },
  {
    "name": "Dhanekula Institute of Engineering & Technology, Ganguru, Penamalluru Mandal, PIN-521139(CC-8T)"
  },
  {
    "name": "Dhanvanthari Institute of Management Sciences, Sujathanagar, Kothagudem, Khammam"
  },
  {
    "name": "Dhanvanthri College of Pharmaceutical Scienes"
  },
  {
    "name": "Dhanvanthri Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Dharmavanth Degree College"
  },
  {
    "name": "DHARMIKA DEGREE COLLEGE"
  },
  {
    "name": "DHARVI COLLEGE OF NURSING"
  },
  {
    "name": "DHRUVA COLLEGE OF FASHION TECHNOLOGY"
  },
  {
    "name": "DHRUVA DEGREE COLLEGE"
  },
  {
    "name": "DHRUVA INSTITUTE OF ENGINEERING AND TECHNOLOGY"
  },
  {
    "name": "Dileef College of Nursing, Nellore"
  },
  {
    "name": "Disha Degree College for Women"
  },
  {
    "name": "DIVYA COLLEGE OF EDUCATION"
  },
  {
    "name": "DIVYA DEGREE COLLEGE"
  },
  {
    "name": "DLR College PG Courses, G.Mamidada"
  },
  {
    "name": "DNR COLLEGE OF EDUCATION "
  },
  {
    "name": "Doddapaneni Prameela Memorial College of Education, A.S.Peta, Atmakur,"
  },
  {
    "name": "DON BOSCO COLLEGE OF EDUCATION"
  },
  {
    "name": "Don Bosco Degree College"
  },
  {
    "name": "DON BOSCO DEGREE COLLEGE, NALGONDA"
  },
  {
    "name": "Don Bosco P.G. College, Guntur"
  },
  {
    "name": "DON BOSCO PG COOLLEGE NALGONDA"
  },
  {
    "name": "Donbosco Degree College"
  },
  {
    "name": "DR ANJI REDDY COLLEGE OF NURSING"
  },
  {
    "name": "DR C R REDDY COLLEGE OF ARTS AND SCIENCE"
  },
  {
    "name": "Dr CSN INSTITUTE OF PHARMACY"
  },
  {
    "name": "DR G VENKATA SUBBAIAH COLLEGE OF PHYSIOTHERAPY KADAPA"
  },
  {
    "name": "DR G VENKATA SUBBAIAH MEMORIAL COLLEGE OF HEALTH SCIENCES KADAPA"
  },
  {
    "name": "DR GURURAJU GOVERNMENT HOMOEOPATHIC MEDICAL COLLEGE"
  },
  {
    "name": "Dr K V SUBBA REDDY BEd COLLEGE"
  },
  {
    "name": "DR K V SUBBA REDDY INSTITUTE OF MANAGEMENT"
  },
  {
    "name": "DR NARAYANA COLLEGE OF COMMERCE "
  },
  {
    "name": "DR PATNAM MAHENDER REDDY COLLEGE OF PHYSIOTHERAPY    "
  },
  {
    "name": "Dr PATNAM MAHENDER REDDY INSTITUTE OF MEDICAL SCIENCES"
  },
  {
    "name": "DR PENUBALA CHANDRASEKHAR AND GEETHADEVI DEGREE COLLEGE"
  },
  {
    "name": "DR PENUBALA COLLEGE OF NURSING"
  },
  {
    "name": "DR PENUBALA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "DR PENUBALA PENCHALAIAH COLLEGE OF EUDCATION, RLY KODUR"
  },
  {
    "name": "DR SAI KALESWAR MEMORIAL DEGREE COLLEGE"
  },
  {
    "name": "DR SAMUEL GEORGE INSTITUTE OF PHYSICAL EDUCATION"
  },
  {
    "name": "DR V R K INSTITUTE OF TECHNOLOGY    "
  },
  {
    "name": "DR VRK INSTITUTE OF PHARMACEUTICAL SCIENCES    "
  },
  {
    "name": "Dr Y S R Horticulture University"
  },
  {
    "name": "Dr YSR Architecture and Fine Arts University"
  },
  {
    "name": "DR YSR GOVT DEGREE COLLEGE VEDURUKUPPAM"
  },
  {
    "name": "Dr.  C.L. NAIDU DEGREE COLLEGE"
  },
  {
    "name": "Dr. A.E.R. Degree College, Tirupati"
  },
  {
    "name": "Dr. Abdul Haq Unani College & Hospital, Kurnool"
  },
  {
    "name": "DR. ABDUL HAQ URDU UNIVERSITY"
  },
  {
    "name": "Dr. Ambedkar Law College, Renigunta Road, Tirupati"
  },
  {
    "name": "Dr. B. R. Ambedkar College"
  },
  {
    "name": "Dr. B. R. Ambedkar Open University, Hyderabad"
  },
  {
    "name": "Dr. B.R. Ambedkar Institute of Management & Technology"
  },
  {
    "name": "Dr. B.R. Ambedkar Law College"
  },
  {
    "name": "Dr. B.R. Ambedkar Paramedical Sciences, Nalgonda"
  },
  {
    "name": "Dr. B.R.Ambedkar Centenary Degree College, Tenali"
  },
  {
    "name": "Dr. B.R.K.R. Govt. Ayurvedic College, Hyderabad"
  },
  {
    "name": "Dr. BRR Govt. Degree College, Jadcherla"
  },
  {
    "name": "Dr. C. Sobhanadri Siddhartha College of Nursing, Gannavaram"
  },
  {
    "name": "Dr. C.R.R. College of Education Sydapuram (M), Nellore (Dt.)"
  },
  {
    "name": "Dr. C.S.N. DEGREE & P.G. COLLEGE"
  },
  {
    "name": "Dr. C.V Ramana Degree College, Naidupeta"
  },
  {
    "name": "Dr. Chennur Radha Krishna Reddy Degree College,Sydapuram"
  },
  {
    "name": "DR. D.S. KOTHARI COLLEGE OF EDUCATION"
  },
  {
    "name": "Dr. Gururaj Govt. Homoeo Medical College, Gudiwada"
  },
  {
    "name": "Dr. Helen College of Nursing, Jammalamadugu"
  },
  {
    "name": "Dr. Hima Sekhar Degree College"
  },
  {
    "name": "Dr. Jayapradamba Degree College, Guntur"
  },
  {
    "name": "Dr. K. V. Subba Reddy School of Business Management"
  },
  {
    "name": "Dr. K.R.R.M. Degree College, Duggirala"
  },
  {
    "name": "Dr. K.S.P.R College of Education, Kesanupalli, Narasaraopeta"
  },
  {
    "name": "Dr. Kunchala Rajarathnam Christian  Degree College, Jeevagram, Renigunta Rural"
  },
  {
    "name": "Dr. Lakireddy Hanimireddy Government Degree College, Mylavaram"
  },
  {
    "name": "Dr. Lankapalli Bullayya College"
  },
  {
    "name": "Dr. Lankapalli Bullayya College of Engineering"
  },
  {
    "name": "Dr. M.R. Reddy Degree College, Parkal  506 164"
  },
  {
    "name": "Dr. Maddigopalakrishna Reddy Degree College"
  },
  {
    "name": "Dr. Modigunta Raja Reddy Degree College 4-139,Main Road,K.C.Palli Road,Penumuru (M),"
  },
  {
    "name": "Dr. Muscu Madhusudan Reddy College of Physical Education "
  },
  {
    "name": "Dr. N.T.R. University of Health Sciences, Vijaywada"
  },
  {
    "name": "Dr. Narayana College of Hotel Management"
  },
  {
    "name": "DR. NARAYANA DEGREE COLLEGE OF COMMERCE & SCIENCE"
  },
  {
    "name": "Dr. NRS Ayurvedic College, Vijayawada"
  },
  {
    "name": "Dr. Pinnemaneni Siddhartha Inst. of Medical Sciences & Research Foundation, Chinnaoutpalli"
  },
  {
    "name": "Dr. Rajendra Prasad B.Ed. College, Asifabad"
  },
  {
    "name": "Dr. RJC College of Higher Education, Trunk Road, Khammam"
  },
  {
    "name": "Dr. Samuel George College of Pharmaceutical Science, Markapur"
  },
  {
    "name": "Dr. Samuel George Institute of Engineering & Technology, George Town, Darimadugum,(Post & Village) , Markapur(M), PIN-523 316.(CC-35)"
  },
  {
    "name": "Dr. SARVEPALLI RADHAKRISHNA DEGREE COLLEGE"
  },
  {
    "name": "Dr. SRJ Degree College, Atmakur"
  },
  {
    "name": "Dr. Sudha & Nageswara Rao Inst. of Dental Sciences, Chinaoutpalli"
  },
  {
    "name": "DR. V.R.K. WOMEN\u2019S COLLEGE OF PHARMACY"
  },
  {
    "name": "Dr. V.S. Krishna Government Degree College"
  },
  {
    "name": "Dr. VRK Women's College of Engineering & Technology"
  },
  {
    "name": "Dr. VRK Women's Medical College, Aziznagar"
  },
  {
    "name": "DR. ZAKIR HUSSAIN COLLEGE OF ARTS & SCIE"
  },
  {
    "name": "Dr. Zakir Hussain College of Education, Mulukuduru, Ponnur"
  },
  {
    "name": "Dr.A.E.R College of Mgnt Studies & Research, Ramapuram, Tirupati"
  },
  {
    "name": "Dr.Allu Ramalingaiah Government Homoeo Medical College, Rajahmundry"
  },
  {
    "name": "Dr.B.R.Ambedkar College of Law"
  },
  {
    "name": "Dr.B.R.Ambedkar University, Etcherla"
  },
  {
    "name": "Dr.Homi Jahangir Baba Degree College, Karlapalem"
  },
  {
    "name": "Dr.Jyothirmayi Degree College,"
  },
  {
    "name": "Dr.K.V.R.D & S.G.J.V.S.Degree College"
  },
  {
    "name": "Dr.K.V.Subba Reddy Institute of Pharmacy, Kurnool"
  },
  {
    "name": "Dr.K.V.Subba Reddy Institute of Technology, Kurnool"
  },
  {
    "name": "Dr.Mallela Ramaiah College of Nursing"
  },
  {
    "name": "Dr.N.T.R. Degree College, Balighattam, Narsipatnam"
  },
  {
    "name": "Dr.PAUL RAJ ENGINEERING COLLEGE"
  },
  {
    "name": "Dr.PVG Raja Saheb College of Education"
  },
  {
    "name": "Dr.R.B.R.V.R.N.Edl.Academy Mahila Degree College"
  },
  {
    "name": "Dr.R.C.Reddy Degree College, Tirupati Urban"
  },
  {
    "name": "Dr.VARALAKSHMI B P Ed COLLEGE"
  },
  {
    "name": "Dravidian University, Kuppam, Chittoor District"
  },
  {
    "name": "DRK College of Engineering & Technology"
  },
  {
    "name": "DRK Institute of Science & Technology"
  },
  {
    "name": "DRK REDDY COLLEGE OF PHYSICAL EDUCATION, G. MAMIDADA"
  },
  {
    "name": "DRNSCVS College, Chilakaluripeta"
  },
  {
    "name": "DRS College of Education, Thorrur"
  },
  {
    "name": "DRS Degree College, Mamillagudem, Khammam"
  },
  {
    "name": "DRW College, Gudur"
  },
  {
    "name": "DUGYALA GOPAL RAO MEMORIAL DEGREE COLLEGE, THUNGATURTHY"
  },
  {
    "name": "Duragabai Deshmukh Hospital & Research Centre, College of Physiotheraphy, Hyderabad"
  },
  {
    "name": "DURGA COLLEGE OF NURSING"
  },
  {
    "name": "DURGABAI DESHMUKH COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Durgabhai Deshmukh College of B.Sc Nursing, Hyderabad"
  },
  {
    "name": "DVK DEGREE COLLEGE   ASWARAOPETA"
  },
  {
    "name": "DVM COLLEGE OF BUSINESS MANAGEMENT, CHERLAPALLY"
  },
  {
    "name": "DVM COLLEGE OF EDUCATION, NALGONDA"
  },
  {
    "name": "DVR & Dr. HS MIC College of Technology"
  },
  {
    "name": "DVR and DS MEMORIAL DEEPTHI B.Ed College"
  },
  {
    "name": "Eashwaribai Memorial College of Nursing, Secunderabad"
  },
  {
    "name": "EDAVANTA DEGREE COLLEGE (Hayathnagar)"
  },
  {
    "name": "EDGE International Business School"
  },
  {
    "name": "EKALAVYA DEGREE COLLEGE, JAM, SARANGAPUR"
  },
  {
    "name": "Ekashila College of Education, Hyderabad Road, Jangaon"
  },
  {
    "name": "Ekashila Degree College, Jangaon  506 167"
  },
  {
    "name": "Ekashila Degree College, Mamada (V&M)"
  },
  {
    "name": "Elim College of Education "
  },
  {
    "name": "ELISHA DEGREE COLLEGE"
  },
  {
    "name": "Elite Degree College"
  },
  {
    "name": "Ellenki College of Engineering and Technology"
  },
  {
    "name": "Ellenki Degree College (Narsapur)"
  },
  {
    "name": "Ellenki Degree College (Sangareddy)"
  },
  {
    "name": "ELURU COLLEGE OF ENGINEERING  & TECHNOLOGY"
  },
  {
    "name": "Emeralds Degree College, Tirupati Urban"
  },
  {
    "name": "Emmanuel College of Education"
  },
  {
    "name": "EMMANUEL COLLEGE OF NURSING MAKAVARAPALEM VISAKHAPATNAM DISTRICT"
  },
  {
    "name": "EMMANUEL COLLEGE OF PHARMACY"
  },
  {
    "name": "Emmenual Degree College, Tamavaram"
  },
  {
    "name": "Emmi College of Nursing, Phirangipuram, Guntur"
  },
  {
    "name": "ENLIGHT COLLEGE OF SCIENCE AND COMMERCE"
  },
  {
    "name": "ENRICH CHRISTIAN COLLEGE OF EDUCAITON, MARRIGUDA"
  },
  {
    "name": "Erigineni Tirupati Naidu & Lakshmamma Degree College, Pamur"
  },
  {
    "name": "ESIC Medical College"
  },
  {
    "name": "ESS Degree College, Venkatagiri"
  },
  {
    "name": "Eswar College of Engineering, Kesanupalli(V),  Narasaraopet , PIN-522 601(CC-JE)"
  },
  {
    "name": "ETHAMES DEGREE COLLEGE (PANJAGUTTA)"
  },
  {
    "name": "EV REDDY MEMORIAL DEGREE COLLEGE, KODAD"
  },
  {
    "name": "Evangeline Booth College of Nursing, Ponnur"
  },
  {
    "name": "EXCEL COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "EXCEL COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "Excellency  College of hotel management "
  },
  {
    "name": "Excellent Degree College, Cherial (V&M)"
  },
  {
    "name": "FATHER COLOMBO COLLEGE OF NURSING"
  },
  {
    "name": "FATHER COLOMBO INSTITUTE OF MEDICAL SCIENCES "
  },
  {
    "name": "Fathima College of Education, Fathima Nagar, Kazipet, Warangal"
  },
  {
    "name": "Fathima Institute of Medical Scineces, Pulivendula"
  },
  {
    "name": "Fatima College of Education, Nadikudi"
  },
  {
    "name": "FERGUSSON CENTRE FOR HIGHER LEARNING"
  },
  {
    "name": "Florence Nightingale College of Nursing, Kankipadu"
  },
  {
    "name": "Florence Nightingale Modern B.Sc Nursing Degree College For Women, Kadapa"
  },
  {
    "name": "Footwear Design and Development Institute - Hyderabad"
  },
  {
    "name": "FOREST COLLEGE AND RESEARCH INSTITUTE"
  },
  {
    "name": "FRIENDS COLLEGE OF EDUCATION, CHAPADU"
  },
  {
    "name": "FSB Degree College"
  },
  {
    "name": "G HOTEL MANAGEMENT COLLEGE"
  },
  {
    "name": "G V R  & S College of Engineering & Technology, Ganjinenipuram, Near Budampadu,PIN- 522013(CC-2W)"
  },
  {
    "name": "G V R & S Degree College for Women, Guntur"
  },
  {
    "name": "G. Pulla Reddy College of Pharmacy"
  },
  {
    "name": "G. Pulla Reddy Degree & P.G College"
  },
  {
    "name": "G. Pulla Reddy Engineering College, (Autonomous), Kurnool"
  },
  {
    "name": "G.B.R. College of Education"
  },
  {
    "name": "G.B.R.Degree College"
  },
  {
    "name": "G.C & Y P N Degree College, Kanigiri"
  },
  {
    "name": "G.C.K.V.N. Degree College, Guntur"
  },
  {
    "name": "G.M. College of Education, Nandyal"
  },
  {
    "name": "G.M.R. College of Education, Nandyal"
  },
  {
    "name": "G.M.R. MEMORIAL VIDYARDHI COLLEGE"
  },
  {
    "name": "G.Narayanamma Institute of Technology & Science for Women"
  },
  {
    "name": "G.Pulla Reddy Dental College & Hospital, Kurnool"
  },
  {
    "name": "G.Pullaiah College of Engineering & Technology, Kurnool"
  },
  {
    "name": "G.R.K Degree College, Maddipadu"
  },
  {
    "name": "G.R.R. & T.P.R. Degree College, Kandulapuram, Cumbum"
  },
  {
    "name": "G.T.P.COLLEGE OF EDUCATION FOR WOMEN"
  },
  {
    "name": "G.V.& A.D.S.L. College of Education, Ongole"
  },
  {
    "name": "G.V.K. Emergency Management & Research Institute"
  },
  {
    "name": "G.V.R & S College of Education, Guntur"
  },
  {
    "name": "G.V.R.S Institute for Professional Studies, Guntur"
  },
  {
    "name": "G.V.S.M. GOVT. Degree College"
  },
  {
    "name": "Gajwel College of Education"
  },
  {
    "name": "GALAXY Degree College"
  },
  {
    "name": "Galaxy Degree college (Shalibanda)"
  },
  {
    "name": "Ganapathi College of Education, Parkal"
  },
  {
    "name": "Ganapathi Engineering College"
  },
  {
    "name": "Ganapathy Degree College, H.No. 9-18, Mahadevpur Road, Parkal"
  },
  {
    "name": "Gandhi Academy of Technnical Education"
  },
  {
    "name": "Gandhi Institute of Technology & Management (GITAM) University, Visakhapatnam"
  },
  {
    "name": "Gandhi Medical College, Secunderabad"
  },
  {
    "name": "GANDHI MEMORIAL DEGREE & PG COLLEGE, MARKANDEYA COLONY, GODAVARIKHANI"
  },
  {
    "name": "Gandhi Naturopathy Medical College, Hyderabad"
  },
  {
    "name": "Gandhian College of Education"
  },
  {
    "name": "GANDHIJI MAHILA KALASALA"
  },
  {
    "name": "Gate Degree  College, Tirupati  Urban"
  },
  {
    "name": "Gate Institute of Tech. & Manag. Sciences, Tirupati"
  },
  {
    "name": "GATES Institute of Technology,  Gooty"
  },
  {
    "name": "Gauthami Degree College"
  },
  {
    "name": "Gauthami Degree College (Chintal)"
  },
  {
    "name": "Gayathri College of Education, Wanaparthy"
  },
  {
    "name": "Gayathri Degree & P.G College, Wanaparthy"
  },
  {
    "name": "GAYATHRI DEGREE & PG COLLEGE, H.No.1-2-14/A/1/1&2, Christian Colony, Peddapalli"
  },
  {
    "name": "Gayathri Degree & PG College, H.No.1-2-14/A/1/1&2, Christian Colony, Peddapalli"
  },
  {
    "name": "GAYATHRI DEGREE COLLEGE (NARSAPUR)"
  },
  {
    "name": "Gayathri Degree College for Women"
  },
  {
    "name": "GAYATHRI DEGREE COLLEGE, (V&M):YELLAREDDYPET"
  },
  {
    "name": "GAYATHRI DEGREE COLLEGE,IEEJA,JOGULAMBA GADWAL."
  },
  {
    "name": "Gayathri Degree College,Jammikunta"
  },
  {
    "name": "GAYATRI COLLEGE FOR P.G. COURSES  "
  },
  {
    "name": "Gayatri College of Education"
  },
  {
    "name": "Gayatri College of Education, Darimadugu Village, Markapur, Prakasam District"
  },
  {
    "name": "GAYATRI COLLEGE OF SCIENCE & MANAGEMENT, MUNASABPETA, SRIKAKULAM"
  },
  {
    "name": "GAYATRI DEGREE COLLEGE"
  },
  {
    "name": "GAYATRI DEGREE COLLEGE ANANDAPURAM"
  },
  {
    "name": "Gayatri Degree College,  Kotavuratla,Vsp"
  },
  {
    "name": "Gayatri Degree College, Buchayyapeta"
  },
  {
    "name": "Gayatri Degree College, Near RTC Complex, Seethanagaram"
  },
  {
    "name": "Gayatri Degree College, Payakarao peta, Vsp."
  },
  {
    "name": "Gayatri Degree College, Puritipenta(V), Vzm"
  },
  {
    "name": "Gayatri Degree College, Tirupati   Urban"
  },
  {
    "name": "Gayatri Degree College, Vzm"
  },
  {
    "name": "Gayatri Mahila Degree College"
  },
  {
    "name": "Gayatri Vidya Parishad College for Degree & PG courses (A)"
  },
  {
    "name": "Gayatri Vidya Parishad College of Engineering "
  },
  {
    "name": "Gayatri Vidya Parishad College of Engineering for Women, Madhurawada, PIN-530048(CC-JG)"
  },
  {
    "name": "GAYATRI VIDYA PARISHAD INSTITUTE OF HEALTH CARE AND MEDICAL TECHNOLOGY"
  },
  {
    "name": "GBR DEGREE COLLEGE MBA PROGRAMME"
  },
  {
    "name": "GDMM COLLEGE OF NURSING"
  },
  {
    "name": "GDMM COLLEGE OF NURSING"
  },
  {
    "name": "Geervani Degree College, Mudhol (V&M)"
  },
  {
    "name": "GEETAM DEGREE COLLEGE"
  },
  {
    "name": "Geetanjali College of Engineering & Technology"
  },
  {
    "name": "Geetanjali College of Nursing, Kadapa"
  },
  {
    "name": "Geetanjali Degree College"
  },
  {
    "name": "GEETANJALI DEGREE COLLEGE"
  },
  {
    "name": "GEETANJALI DEGREE COLLEGE, NAWABPET"
  },
  {
    "name": "Geetanjali Nursing College, Kurnool"
  },
  {
    "name": "Geetham Degree College, Ongole"
  },
  {
    "name": "Geethanjali College of Pharmacy"
  },
  {
    "name": "Geethanjali Degree College"
  },
  {
    "name": "Geethanjali Degree College"
  },
  {
    "name": "Geethanjali Degree College (KUSHAIGUDA)"
  },
  {
    "name": "Geethanjali Degree College for Women, H.No. 5-11-139 & 140, Naimnagar, Hanumakonda"
  },
  {
    "name": "GEETHANJALI DEGREE COLLEGE HABSIGUDA"
  },
  {
    "name": "Geethanjali Degree College,  Nawabpet"
  },
  {
    "name": "Geethanjali Degree College, Darsi"
  },
  {
    "name": "Geethanjali Degree College, Rajampet"
  },
  {
    "name": "Geethanjali Institute of Science and Technology"
  },
  {
    "name": "Geethika B.Ed College, Piduguralla"
  },
  {
    "name": "GEMS COLLEGE OF B.Sc.MLT"
  },
  {
    "name": "GEMS COLLEGE OF NURSING"
  },
  {
    "name": "GEMS College of Physiotherapy"
  },
  {
    "name": "GEMS Medical College, Srikakulam"
  },
  {
    "name": "GESTO CULINARY & HOSPITALITY ACADEMY"
  },
  {
    "name": "GHANTA NARAYANA RAO PRIVATE UN  AIDED DEGREE COLLEGE"
  },
  {
    "name": "Ghulam Ahmed College of Education"
  },
  {
    "name": "GIDEONS COLLEGE OF EDUCATION, GIDDALURU"
  },
  {
    "name": "GIET DEGREE COLLEGE"
  },
  {
    "name": "GIET Engineering College"
  },
  {
    "name": "GIET SCHOOL OF PHARMACY"
  },
  {
    "name": "Girraj Government College, Nizamabad (5005)"
  },
  {
    "name": "GITAM : Gandhi Institute of Technology and Management, Off Campus - Hyderabad"
  },
  {
    "name": "GITAM Dental College and Hospital, Visakhapatnam"
  },
  {
    "name": "GITAM INSTITUTE OF MEDICAL SCIENCES AND RESEARCH"
  },
  {
    "name": "GITAMS Business and IT School"
  },
  {
    "name": "GITAMS Degree College, Kadapa"
  },
  {
    "name": "GITHANJALI DEGREE COLLEGE"
  },
  {
    "name": "Gland Institute of Pharmaceutical Sciences"
  },
  {
    "name": "GLOBAL ACADEMY OF HOTEL MANAGEMENT"
  },
  {
    "name": "Global College of Engineering & Technology"
  },
  {
    "name": "Global College of Nursing, Kanuru"
  },
  {
    "name": "Global College of Pharmacy"
  },
  {
    "name": "Global Education centre"
  },
  {
    "name": "Global Inst. of Paramedical Sciences, Kanuru"
  },
  {
    "name": "Global Institute of Business Management,  Markapur,  PIN-523316(CC-9B)"
  },
  {
    "name": "Global Institute of Engineering & Technology"
  },
  {
    "name": "Global Institute of Hotel Management"
  },
  {
    "name": "Global Institute of Management"
  },
  {
    "name": "Global Institute of Management & Technology, Bommuluru, Hanuman Junction, Bapulapadu Mandal,PIN- 521105,(CC - 7P)"
  },
  {
    "name": "GLOBAL KASTURBA COLLEGE OF NURSING"
  },
  {
    "name": "Global Kasturiba College of Nursing, Hyderabad"
  },
  {
    "name": "GM POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "GMR BED COLLEGE  YEMMIGANUR"
  },
  {
    "name": "GMR College of Education"
  },
  {
    "name": "GMR Institute of Technology (GMRIT)"
  },
  {
    "name": "Gnana Saraswathi (GSR) Degree College, Nirmal (Adarsha Womens)"
  },
  {
    "name": "Gnana Saraswathi Degree College,Bethamcherla - 518599"
  },
  {
    "name": "GNANAJYOTHI DEGREE COLLEGE"
  },
  {
    "name": "GNANODAYA DEGREE COLLEGE OPP: BYPASS, RAIKAL"
  },
  {
    "name": "Gnanodaya Degree College, Kammarpally, Nizamabad (5043)"
  },
  {
    "name": "GNANODAYA DEGREE COLLEGE, NEAR COURT METPALLY"
  },
  {
    "name": "Godavari Institute of Engineering & Technology (GIET), NH-5, Chaitanya nagar, Velaguvanda Village, Rajanagaram(M),Rajahmundry,PIN- 533296  (CC-55)"
  },
  {
    "name": "Goka Raju Ranga Raju Institute of Engineering & Technology"
  },
  {
    "name": "GOKARAJU LAILAVATHI  ENGINEERING COLLEGE"
  },
  {
    "name": "Gokaraju Rangaraju College of Pharmacy"
  },
  {
    "name": "GOKUL COLLEGE OF EDUCAITON, NALGONDA"
  },
  {
    "name": "GOKUL College of pharmacy, Piridi, Bobbili,  Pin- 535558 (CC-HH)"
  },
  {
    "name": "Gokul Degree College"
  },
  {
    "name": "Gokul Group of Institutions,AP PIN- 535568 (CC-8K)"
  },
  {
    "name": "Gokula Krishna College of Pharmacy, Sullurpet"
  },
  {
    "name": "Gokulakrishna College of  Engineering, Sullerpet"
  },
  {
    "name": "Gokuldas Purushothamdas Ladda (GPL) Degree College, Nirmal Road, Bhainsa"
  },
  {
    "name": "GOLDEN VALLEY INSTITUTE OF PHYSICAL EDUCATION"
  },
  {
    "name": "GONNA COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "Gonna Institute of Information Technology & Science, Gonnavanipalem, Aganampudi, Ward No. 56, G.V.M.C, PIN- 530046 (CC-6E)"
  },
  {
    "name": "GOOD WILL DEGREE COLLEGE B KOTHAKOTA"
  },
  {
    "name": "GOPALA KRISHNA COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "GOURISHETTY VENKATAIAH MEMORIAL COLLEGE OF EDUCATION, JAGITIAL ROAD, KNR"
  },
  {
    "name": "GOUTAMI DEGREE COLLEGE, BHONGIR"
  },
  {
    "name": "GOUTAMI DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "Goutami Institute of Technology & Management for Women, Proddatur"
  },
  {
    "name": "Goutham College of Education, Cumbum"
  },
  {
    "name": "Goutham Degree College,Kishanpura,Hanamkonda"
  },
  {
    "name": "Gouthami Degree College for Women"
  },
  {
    "name": "Gouthami Degree College, # 1-2-12/15, Shanthinagar, Adilabad"
  },
  {
    "name": "Gouthami Degree College, 4-76, BC Colony, Old Bazar,Mahabubabad 506 101"
  },
  {
    "name": "Gouthami Degree College, Nizamabad (5006)"
  },
  {
    "name": "Gouthami PG College, Nizamabad (5221)"
  },
  {
    "name": "Goverdhan Reddy Degree College,Telkapally"
  },
  {
    "name": "GOVERNAMENT DEGREE COLLEGE,HUZURANAGAR"
  },
  {
    "name": "GOVERNAMENT MEDICAL COLLEGE"
  },
  {
    "name": "GOVERNMENT COLLEGE  OF NURSING, MANCHERIAL"
  },
  {
    "name": "Government College (A), Anantapur"
  },
  {
    "name": "Government College for Men, Kadapa"
  },
  {
    "name": "Government College for Men, Kadapa (PG)"
  },
  {
    "name": "GOVERNMENT COLLEGE FOR MEN, KURNOOL"
  },
  {
    "name": "GOVERNMENT COLLEGE FOR WOMEN"
  },
  {
    "name": "Government College for Women Autonomous, Guntur"
  },
  {
    "name": "Government College of Nursing"
  },
  {
    "name": "Government College of Nursing "
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING "
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING"
  },
  {
    "name": "Government college of nursing"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING ONGOLE"
  },
  {
    "name": "Government College of Nursing, Anantapur"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING, GUNTUR"
  },
  {
    "name": "Government College of Nursing, Hyderabad"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING, KAKINADA"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING, KOTHAGUDEM"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING, MACHILIPATNAM"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING, PALAIR"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING, RIMS, ADILABAD"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING, SANGAREDDY"
  },
  {
    "name": "Government College of Nursing, Secunderabad"
  },
  {
    "name": "Government College of Nursing, Warangal"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING,ELURU"
  },
  {
    "name": "GOVERNMENT COLLEGE OF NURSING,MAHABUBABAD"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE    "
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE"
  },
  {
    "name": "Government Degree College  Gajapathinagaram"
  },
  {
    "name": "Government Degree College  Kaghaznagar"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE (NARSAPUR)"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE ,QUTHBULLAPUR"
  },
  {
    "name": "Government Degree college Arakuvalley"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE CHANCHALGUDA"
  },
  {
    "name": "Government Degree College Chinturu"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE ECHODA    "
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE FOR MEN"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE FOR WOMEN (JOGIPET)"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE FOR WOMEN PULIVENDULA"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE FOR WOMEN RAYACHOTY"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE FOR WOMEN TAGARAPUVALASA"
  },
  {
    "name": "Government Degree College for Women, Adilabad"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE FOR WOMEN, JAGTIAL"
  },
  {
    "name": "Government Degree College for Women, Khammam"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE MUMMIDIVARAM"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE Narasanna Peta"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE PALASA"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE PERUMALLAPURAM"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE RAJENDRANAGAR    "
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE RAMAYAMPET"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE Tekkali"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE UPPAL "
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE W N ASIFABAD"
  },
  {
    "name": "Government Degree College(Sciences) Nagarkurnool."
  },
  {
    "name": "Government Degree College, Adilabad"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, ALAMURU"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, ALIR"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, AMADALAVALASA"
  },
  {
    "name": "Government Degree College, Armoor (5010)"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, BADANGPET"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, BARUVA"
  },
  {
    "name": "Government Degree College, Bellampally 504 251"
  },
  {
    "name": "Government Degree College, Bhadrachalam"
  },
  {
    "name": "Government Degree College, Bhupalpally"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, CHANDUR"
  },
  {
    "name": "Government Degree College, Chennoor 504 201"
  },
  {
    "name": "Government Degree College, Cherial"
  },
  {
    "name": "Government Degree College, Chodavaram"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, CHOPPADANDI"
  },
  {
    "name": "Government Degree College, Cumbum"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, DARSI"
  },
  {
    "name": "Government Degree College, Dharpally, Nizamabad (5063)"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, DORNALA"
  },
  {
    "name": "Government Degree College, Eturu Nagaram"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, Falaknuma"
  },
  {
    "name": "Government Degree College, Garla"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, HALIYA"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, HUSNABAD"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, ICHAPURAM"
  },
  {
    "name": "Government Degree College, Jammalamadugu"
  },
  {
    "name": "Government degree college, Kovvuru"
  },
  {
    "name": "Government Degree College, Luxettipet"
  },
  {
    "name": "Government Degree College, Madhira"
  },
  {
    "name": "Government Degree College, Mahabubabad"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, MAHADEVAPUR"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, MAHESHWARAM "
  },
  {
    "name": "Government Degree College, Mancherial  504 208"
  },
  {
    "name": "Government Degree College, Manuguru"
  },
  {
    "name": "Government Degree College, Marripeda"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, METPALLY"
  },
  {
    "name": "Government Degree College, Mulug"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, Nakkapalli"
  },
  {
    "name": "Government Degree College, Narsampet  506 132"
  },
  {
    "name": "Government Degree College, Narsipatnam"
  },
  {
    "name": "Government Degree College, Nelakondapally"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, NERELLA, GAMBHIRRAOPET"
  },
  {
    "name": "Government Degree College, Nirmal  504 106"
  },
  {
    "name": "Government Degree College, Paderu"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, PALAKONDA"
  },
  {
    "name": "Government Degree College, Paloncha"
  },
  {
    "name": "Government Degree College, Parkal"
  },
  {
    "name": "Government Degree College, Pathapatnam "
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, PONDURU"
  },
  {
    "name": "Government Degree College, Rajam "
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, RAMMANNAPET"
  },
  {
    "name": "Government Degree College, Rangasaipet, Warangal"
  },
  {
    "name": "Government Degree College, Rayachoti"
  },
  {
    "name": "Government Degree College, Razole"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, SEETHAMMAPETA"
  },
  {
    "name": "Government Degree College, Shanthinagar"
  },
  {
    "name": "Government Degree College, Tadipatri"
  },
  {
    "name": "Government Degree College, Thorrur"
  },
  {
    "name": "Government Degree College, Uravakonda"
  },
  {
    "name": "Government Degree College, Utnoor"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE, VEERAGHATTAM"
  },
  {
    "name": "Government Degree College, Wardhannapet"
  },
  {
    "name": "Government Degree College, Yeleswaram"
  },
  {
    "name": "Government Degree College, Yellandu"
  },
  {
    "name": "Government Degree College, Yerragondapalem"
  },
  {
    "name": "GOVERNMENT DEGREE COLLEGE,RAMACHANDRAPURAM"
  },
  {
    "name": "Government Degree College,Sitaphalmandi_60183"
  },
  {
    "name": "Government Dental College, Hyderabad"
  },
  {
    "name": "GOVERNMENT ENGINEERING COLLEGE, KOSGI    "
  },
  {
    "name": "GOVERNMENT HOMOEOPATHIC MEDICAL COLLEGE"
  },
  {
    "name": "GOVERNMENT MEDIACL COLLEGE,JAGTIAL"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE    "
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE , VIKARABAD"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE ELURU"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE JAYASHANKAR BHUPALPALLY"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE KARIMNAGAR     "
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE MAHABUBABAD"
  },
  {
    "name": "Government Medical College Mahabubnagar"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE NAGARKURNOOL"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE RAJANNA SIRCILLA"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE SANGAREDDY"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE VIZIANAGARAM"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE WANAPARTHY"
  },
  {
    "name": "Government Medical College, Anantapur"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE, KAMAREDDY"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE, KHAMMAM"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE, KUMURAM BHEEM ASIFABAD"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE, MANCHERIAL"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE, NANDYAL"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE, RAMAGUNDAM"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE, SIDDIPET"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE,MACHILIPATNAM"
  },
  {
    "name": "GOVERNMENT MEDICAL COLLEGE,RAJAMAHENDRAVARAM"
  },
  {
    "name": "GOVERNMENTCOLLEGE OF NURSING,GADWAL"
  },
  {
    "name": "Govt college of Nursing,RIMS"
  },
  {
    "name": "GOVT DEGREE COILEGE ARTS AND COMMERCE NAGARKURNOOR"
  },
  {
    "name": "GOVT DEGREE COLLEGE BALKONDA"
  },
  {
    "name": "Govt Degree College For Women Arakuvalley"
  },
  {
    "name": "GOVT DEGREE COLLEGE KOLLAPUR"
  },
  {
    "name": "GOVT DEGREE COLLEGE PEBBAIR "
  },
  {
    "name": "GOVT DEGREE COLLEGE VIZIANAGARAM"
  },
  {
    "name": "GOVT DEGREE COLLEGE, DICHPALLY, NIZAMABAD"
  },
  {
    "name": "GOVT DEGREE COLLEGE, MADNOOR "
  },
  {
    "name": "GOVT DEGREE COLLEGE, MALKAJGIRI"
  },
  {
    "name": "Govt Degree College, Marripalem, Koyyur Mandal"
  },
  {
    "name": "GOVT, DEGREE COLLEGE, PEDDAPALLI"
  },
  {
    "name": "Govt. Arts & Science College, Kamareddy (5009)"
  },
  {
    "name": "Govt. City College"
  },
  {
    "name": "Govt. College of Nursing"
  },
  {
    "name": "Govt. College of Nursing, Kadapa"
  },
  {
    "name": "Govt. College of Nursing, Kurnool"
  },
  {
    "name": "Govt. College of Nursing, Visakhaptnam"
  },
  {
    "name": "Govt. College of Physical Education"
  },
  {
    "name": "GOVT. COLLEGE OF TEACHER EDUCAITON, NAGARJUNASAGAR"
  },
  {
    "name": "Govt. College of Teacher Education, Mahabubnagar"
  },
  {
    "name": "Govt. Degree       College,  Karvetinagaram Rural"
  },
  {
    "name": "Govt. Degree      College,      PUTTUR Rural"
  },
  {
    "name": "Govt. Degree     College for     Women,     Madanapalle  Urban"
  },
  {
    "name": "Govt. Degree & P.G College for Men, Wanaparthy"
  },
  {
    "name": "Govt. Degree College (Arts & Commerce), Nagarkurnool"
  },
  {
    "name": "Govt. Degree College (Chavella)"
  },
  {
    "name": "Govt. Degree College (Dubbak)"
  },
  {
    "name": "Govt. Degree College (Gajwel)"
  },
  {
    "name": "Govt. Degree College (Hayathnagar)"
  },
  {
    "name": "Govt. Degree College (Ibrahimpatnam)"
  },
  {
    "name": "Govt. Degree College (Khairatabad)"
  },
  {
    "name": "Govt. Degree College (Kukatpally)"
  },
  {
    "name": "Govt. Degree College (Medak)"
  },
  {
    "name": "Govt. Degree College (Narayankhed)"
  },
  {
    "name": "Govt. Degree College (Patancheru)"
  },
  {
    "name": "Govt. Degree College (Sadasivpet)"
  },
  {
    "name": "Govt. Degree College (Siddipet)"
  },
  {
    "name": "Govt. Degree College (Tandur)"
  },
  {
    "name": "Govt. Degree College (W), Bapatla, Guntur (Dist.)"
  },
  {
    "name": "Govt. Degree College (Zaheerabad)"
  },
  {
    "name": "Govt. Degree College , Atmakur"
  },
  {
    "name": "Govt. Degree College , Kalwakurthy"
  },
  {
    "name": "Govt. Degree College , Kodangal"
  },
  {
    "name": "Govt. Degree College , Kollapur"
  },
  {
    "name": "Govt. Degree College Autonomous"
  },
  {
    "name": "GOVT. DEGREE COLLEGE BUTTAIGUDEM"
  },
  {
    "name": "GOVT. DEGREE COLLEGE CHINTALAPUDI"
  },
  {
    "name": "Govt. Degree College for women  Sri kalahasthi Urban"
  },
  {
    "name": "Govt. Degree College for Women (Begumpet)"
  },
  {
    "name": "Govt. Degree College for Women (Gajwel)"
  },
  {
    "name": "Govt. Degree College for Women (Hussainialam)"
  },
  {
    "name": "Govt. Degree College for Women (Sangareddy)"
  },
  {
    "name": "Govt. Degree College for Women (Siddipet)"
  },
  {
    "name": "Govt. Degree College for Women, Gadwal"
  },
  {
    "name": "GOVT. DEGREE COLLEGE FOR WOMEN, KARIMNAGAR"
  },
  {
    "name": "GOVT. DEGREE COLLEGE FOR WOMEN, NALGONDA"
  },
  {
    "name": "Govt. Degree College for Women, Wanaparthy"
  },
  {
    "name": "Govt. Degree College Kuppam  Rural  Co-Ed."
  },
  {
    "name": "Govt. Degree College Pakala -Rural             Co-Ed."
  },
  {
    "name": "Govt. Degree College Sathyavedu  Rural            Co-Ed."
  },
  {
    "name": "GOVT. DEGREE COLLEGE, AGRAHARAM"
  },
  {
    "name": "Govt. Degree College, Alur"
  },
  {
    "name": "Govt. Degree College, Amrabad"
  },
  {
    "name": "Govt. Degree College, Atmakur"
  },
  {
    "name": "Govt. Degree College, Banganapalli"
  },
  {
    "name": "GOVT. DEGREE COLLEGE, BANTUMILLI"
  },
  {
    "name": "Govt. Degree College, Bheemgal, Nizamabad (5073)"
  },
  {
    "name": "Govt. Degree College, Bichkunda (5011)"
  },
  {
    "name": "Govt. Degree College, Bodhan (5007)"
  },
  {
    "name": "Govt. Degree College, Chebrolu"
  },
  {
    "name": "Govt. Degree College, Dhone (GVRS)"
  },
  {
    "name": "Govt. Degree College, Eluru"
  },
  {
    "name": "GOVT. DEGREE COLLEGE, GODHAVARIKHANI"
  },
  {
    "name": "GOVT. DEGREE COLLEGE, HUZURABAD"
  },
  {
    "name": "GOVT. DEGREE COLLEGE, JAMMIKUNTA"
  },
  {
    "name": "Govt. Degree College, Kanigiri"
  },
  {
    "name": "Govt. Degree College, Kommavarapukota"
  },
  {
    "name": "GOVT. DEGREE COLLEGE, KORATLA"
  },
  {
    "name": "GOVT. DEGREE COLLEGE, MANTHANI"
  },
  {
    "name": "Govt. Degree College, Morthad (5044)"
  },
  {
    "name": "Govt. Degree College, Mydukur."
  },
  {
    "name": "Govt. Degree College, Naidupeta"
  },
  {
    "name": "Govt. Degree College, Nandikotkur"
  },
  {
    "name": "Govt. Degree College, Pattikonda"
  },
  {
    "name": "GOVT. DEGREE COLLEGE, PENDLIMARRI"
  },
  {
    "name": "Govt. Degree College, Porumamilla."
  },
  {
    "name": "Govt. Degree College, Rajampet"
  },
  {
    "name": "Govt. Degree College, Rapur"
  },
  {
    "name": "Govt. Degree College, Shadnagar"
  },
  {
    "name": "Govt. Degree College, Srisailam"
  },
  {
    "name": "Govt. Degree College, Udayagiri"
  },
  {
    "name": "Govt. Degree College, Yellareddy (5008)"
  },
  {
    "name": "GOVT. DEGREE COLLEGE,AVANGADDA"
  },
  {
    "name": "GOVT. DEGREE COLLEGE,TIRUVURU"
  },
  {
    "name": "GOVT. DEGREE COLLGE, NAKREKAL"
  },
  {
    "name": "Govt. Dental College (RIMS), Kadapa"
  },
  {
    "name": "Govt. Dental College, Vijayawada"
  },
  {
    "name": "Govt. Homoeo Medical College, Kadapa"
  },
  {
    "name": "GOVT. MEDICAL COLLEGE, NIZAMABAD"
  },
  {
    "name": "Govt. Nizamia Tibbi College, Hyderabad"
  },
  {
    "name": "Govt.Degree College, Cheepurupalli"
  },
  {
    "name": "Govt.Degree College, Chintapalli"
  },
  {
    "name": "Govt.Degree College, Gummalakshmipuram"
  },
  {
    "name": "Govt.Degree College, Jaggampeta"
  },
  {
    "name": "Govt.Degree College, Mandapeta"
  },
  {
    "name": "Govt.Degree College, Pithapuram"
  },
  {
    "name": "Govt.Degree College, Rajahmundry"
  },
  {
    "name": "Govt.Degree College, Rampachodavaram"
  },
  {
    "name": "Govt.Degree College, Ravulapalem"
  },
  {
    "name": "Govt.Degree College, Rly.Koduru"
  },
  {
    "name": "Govt.Degree College, S.Kota"
  },
  {
    "name": "Govt.Degree College, Sabbavaram"
  },
  {
    "name": "Govt.Degree College, Salur"
  },
  {
    "name": "Govt.Degree College, Seethanagaram"
  },
  {
    "name": "Govt.Degree College, Tuni"
  },
  {
    "name": "Govt.Degree College, V-Madugula"
  },
  {
    "name": "Govt.Degree College, Yerraguntla"
  },
  {
    "name": "Gowtami College of Nursing, Hyderabad"
  },
  {
    "name": "GOWTHAM DEGREE COLLEGE"
  },
  {
    "name": "Gowtham Degree College, Anantapuram"
  },
  {
    "name": "Gowthamabudda College of Education,Karedu Village,Vulapadu"
  },
  {
    "name": "Gowthami Degree College (Vikarabad)"
  },
  {
    "name": "Gowthami Degree College, Cherla (V&M)"
  },
  {
    "name": "GOWTHAMI DEGREE COLLEGE, HAYATHNAGAR"
  },
  {
    "name": "Gowthami Degree College, Laxmidevipally, Kothagudem"
  },
  {
    "name": "Gowthami Degree College, Mahabubnagar"
  },
  {
    "name": "Grace  Degree College"
  },
  {
    "name": "Grace College of Nursing, Machilipatnam"
  },
  {
    "name": "GRACE COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Grahambell Institute of Technology & Science"
  },
  {
    "name": "GREAT INDIA DEGREE COLLEGE"
  },
  {
    "name": "GREATER COLLEGE OF EDUCATION"
  },
  {
    "name": "Green Lead College of Nursing, Secunderabad"
  },
  {
    "name": "Green Royal Academy of Pharmaceutical Education & Sciences,D.No.2-89,  Koyyalagudem Mandal,   Ponguturu-534312(CC-7H)"
  },
  {
    "name": "GREYFRIARS DEGREE COLLEGE"
  },
  {
    "name": "GRP Government Degree College, Bhainsa  504 103"
  },
  {
    "name": "GSL College of B.Sc MLT, Rajahmundry"
  },
  {
    "name": "GSL College of Nursing, Rajahmundry"
  },
  {
    "name": "GSL COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "GSL dental college"
  },
  {
    "name": "GSL Medical College, Rajahmundry"
  },
  {
    "name": "GSN College of Education, Achempet"
  },
  {
    "name": "GTR College of Nursing, Kakinada"
  },
  {
    "name": "GUNTUR ENGINEERING COLLEGE, NH-5, YANAMADALA, OPP.KATURI MEDICAL OFFICE,PRATHIPADU(md) PIN- 522019 (CC-JK)"
  },
  {
    "name": "Guntur Medical College (B.Sc MLT), Guntur"
  },
  {
    "name": "Guntur Medical College, Guntur"
  },
  {
    "name": "GURAJADA COLLEGE OF EDUCATION"
  },
  {
    "name": "Gurivindapalli Devanandam Mary Memorial College of Engineering & Technology for Women, Ramannapet Road, Nandigama,.PIN-521185(CC-JM"
  },
  {
    "name": "Gurram Balanarasaiah Institute of Pharamcy"
  },
  {
    "name": "GURRAM BALANARASAIAH INSTITUTE OF PHARMACY"
  },
  {
    "name": "GURU NANAK HOMOEOPATHIC MEDICAL COLLEGE AND HOSPITAL"
  },
  {
    "name": "Guru Nanak Institute of Technology"
  },
  {
    "name": "Guru Nanak Institutions Technical Campus"
  },
  {
    "name": "Guru Nanak University"
  },
  {
    "name": "Gurunanak Institute of Pharmacy"
  },
  {
    "name": "Guthikonda Sreeramulu College of Education, Buchireddypalem"
  },
  {
    "name": "GVK Degree College, Kothur"
  },
  {
    "name": "GYAN DEGREE COLLEGE"
  },
  {
    "name": "Gyana Jyothi College of Pharmacy"
  },
  {
    "name": "H P N DEGREE COLLEGE"
  },
  {
    "name": "H P N Degree College Srikakulam"
  },
  {
    "name": "H.M.K.S. & M.G.S. Memorial College of Education"
  },
  {
    "name": "H.P.N. Degree College, Gara"
  },
  {
    "name": "Haindavi College of Education, Dharmavaram"
  },
  {
    "name": "HAINDAVI COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "Haindavi Degree & PG College"
  },
  {
    "name": "Haindavi Degree College"
  },
  {
    "name": "HAINDAVI DEGREE COLLEGE (CHAMAPET)"
  },
  {
    "name": "HAINDAVI DEGREE COLLEGE (KAPRA)"
  },
  {
    "name": "Haindavi Degree College (Mehdipatnam)"
  },
  {
    "name": "HAINDAVI DEGREE COLLEGE (S R NAGAR)"
  },
  {
    "name": "HAINDAVI PG COLLEGE"
  },
  {
    "name": "Haindavi PG College, Dharmavaram"
  },
  {
    "name": "Haji Ghouse Peeran Memorial College"
  },
  {
    "name": "HAJIKAREEM COLLEGE OF EDUCATION"
  },
  {
    "name": "HAMSA HOMEOPATHY MEDICAL COLLEGE HOSPITAL AND RESEARCH CENTRE"
  },
  {
    "name": "Hamsini Degree College"
  },
  {
    "name": "Hanna College Of Education"
  },
  {
    "name": "HARAGOPAL COLLEGE OF EDUCATION"
  },
  {
    "name": "HARIKA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "HARINADHA REDDY INSTITUTE OF MANAGEMENT SCIENCES"
  },
  {
    "name": "Haritha College of Nursing, Kakinada"
  },
  {
    "name": "Haritha Nursing Academy"
  },
  {
    "name": "Haritha Paramedical College (B.Sc MLT), Kakinada"
  },
  {
    "name": "HARSHASRI DEGREE COLLEGE-VELGATOOR"
  },
  {
    "name": "Hashvitha P.G College"
  },
  {
    "name": "HASINI COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "HASITHA WOMENS DEGREE COLLEGE ,MIRYALGUDA"
  },
  {
    "name": "HAYAGREEVA COLLEGE OF EDUCATION"
  },
  {
    "name": "Hazarath Ameeruddin College of Education, Giddaluru"
  },
  {
    "name": "HBS DEGREE COLLEGE"
  },
  {
    "name": "Helapuri Institute of Technology & Science,Vegavaram, Denduluru Mandalam, Eluru"
  },
  {
    "name": "Hellen Keller's College of Special Education"
  },
  {
    "name": "Hellen Keller's Instiute of Research and Rehabilitation for the Disabled Children"
  },
  {
    "name": "HEZEKIAH COLLEGE OF EDUCATION"
  },
  {
    "name": "HIDAYAH DEGREE COLLEGE"
  },
  {
    "name": "Himaja Degree       College, Puttur Rural"
  },
  {
    "name": "Hindi Mahavidyalaya"
  },
  {
    "name": "Hindu College of Education, Guntur"
  },
  {
    "name": "HINDU COLLEGE OF ENGINEERING AND TECHNOLOGY"
  },
  {
    "name": "Hindu College of Management, Guntur"
  },
  {
    "name": "Hindu College of Pharmacy, Guntur"
  },
  {
    "name": "Hindu College, Guntur"
  },
  {
    "name": "Hindu Degree College for Women"
  },
  {
    "name": "Hindustan Shipyard Degree College"
  },
  {
    "name": "HIS COLLEGE OF EDUCATION "
  },
  {
    "name": "HIS Degree College"
  },
  {
    "name": "Holy Faith College of Education, Paloncha"
  },
  {
    "name": "Holy Mary College of Nursing, Hyderabad"
  },
  {
    "name": "HOLY MARY DEGREE COLLEGE, BALANAGAR"
  },
  {
    "name": "Holy Mary Institute of Technology"
  },
  {
    "name": "Holy mary Institute of Technology & Management"
  },
  {
    "name": "Holy Mary Institute of Technology & Science"
  },
  {
    "name": "Holy Mary Institute of Technology & Science College of Pharmacy"
  },
  {
    "name": "Holy Mary Tec.College of Education"
  },
  {
    "name": "Holy Trinity College of Education"
  },
  {
    "name": "Horizon Institute of Technology"
  },
  {
    "name": "Horsley Hills College of Nursing, Madanapalle"
  },
  {
    "name": "Horticultural Polytechnic, Kalikiri"
  },
  {
    "name": "Horticultural Polytechnic, Nuzvid"
  },
  {
    "name": "HRD COLLEGE FOR TEACHER EDUCATION, DEVARAKONDA"
  },
  {
    "name": "HRD Degree & P.G College"
  },
  {
    "name": "Hyderabad Institute of Technology & Management"
  },
  {
    "name": "Hyderabad Presidency College"
  },
  {
    "name": "hyderabad school of business degree college"
  },
  {
    "name": "HYDERABAD SCHOOL OF BUSINESS DEGREE COLLEGE"
  },
  {
    "name": "Hyderabad School of Management"
  },
  {
    "name": "I S O Degree College"
  },
  {
    "name": "I.B.M Degree College"
  },
  {
    "name": "IASE Govt. College of Education, Kurnool"
  },
  {
    "name": "ICFAI Foundation for Higher Education, Hyderabad"
  },
  {
    "name": "ICMR National Institute of Nutrition"
  },
  {
    "name": "ICREATE DEGREE COLLEGE"
  },
  {
    "name": "Ideal & S.K.C.M Degree College, Markapur"
  },
  {
    "name": "Ideal College of Arts & Sciences"
  },
  {
    "name": "Ideal Degree College for Women"
  },
  {
    "name": "Ideal Institute of Technology"
  },
  {
    "name": "IITM Degree College"
  },
  {
    "name": "Image Madhapur College of Nursing, Yapral"
  },
  {
    "name": "IMMACULATE DEGREE COLLEGE"
  },
  {
    "name": "Immanuel Business School"
  },
  {
    "name": "Indian College of Nursing, Mahabubnagar"
  },
  {
    "name": "Indian Institute of Hotel management & Culinery Arts"
  },
  {
    "name": "Indian Institute of Information Technology Design And Manufacturing, Kurnool"
  },
  {
    "name": "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY, SRI CITY"
  },
  {
    "name": "Indian Institute of Management and commerce"
  },
  {
    "name": "INDIAN INSTITUTE OF MANAGEMENT VISAKHAPATNAM"
  },
  {
    "name": "INDIAN INSTITUTE OF PETROLEUM & ENERGY"
  },
  {
    "name": "INDIAN INSTITUTE OF PUBLIC HEALTH HYDERABAD"
  },
  {
    "name": "Indian Institute of Science Education & Research (IISER), Tirupati"
  },
  {
    "name": "Indian Institute of Technology, Hyderabad"
  },
  {
    "name": "Indian Institute of Technology, Tirupati"
  },
  {
    "name": "INDIAN MARITIME UNIVERSITY, VISAKHAPATNAM"
  },
  {
    "name": "INDIRA COLLEGE OF EDUCATION"
  },
  {
    "name": "Indira College of Education"
  },
  {
    "name": "Indira Degree College,  1-15-31, 32, Balaji Nagar, Sirpur Kaghaznagar"
  },
  {
    "name": "Indira Gandhi Degree College"
  },
  {
    "name": "Indira Institute of Technology & Sciences,  Darimadugu(V), Markapur Mandal, PIN- 523316(CC-7Z)"
  },
  {
    "name": "Indira Priyadarshini College of Nursing, Kadapa"
  },
  {
    "name": "Indira Priyadarshini Government Degree College for Women"
  },
  {
    "name": "Indira Priyadarshini Govt. Degree College for Women"
  },
  {
    "name": "Indira Priyadarsni Law College, Ongole"
  },
  {
    "name": "Indira Rajiv     Memorial Degree   College, Kuppam Urban"
  },
  {
    "name": "INDIRADEVI COLLEGE OF EDUCATION"
  },
  {
    "name": "Indo American College of Nursing, Hyderabad"
  },
  {
    "name": "Indur College of Education, Bodhan (5281)"
  },
  {
    "name": "Indur Institute of Engineering & Technology"
  },
  {
    "name": "Indur PG College of Business Management, Bodhan (5171)"
  },
  {
    "name": "Indur Ushodaya Mahila Degree College, Nizamabad (5016)"
  },
  {
    "name": "INFANT JESUS DEGREE COLLEGE"
  },
  {
    "name": "INSTITUTE OF ADVANCED STUDIES IN EDUCATION IASE"
  },
  {
    "name": "Institute of Advanced Study in Education"
  },
  {
    "name": "Institute of Aeronautical Engineering"
  },
  {
    "name": "Institute of Library Science"
  },
  {
    "name": "Institute of Preventive Medicine Public Health Lab & Food (H) Administration, Hyderabad"
  },
  {
    "name": "Institute of Public Enterprises"
  },
  {
    "name": "INTERNATIONAL DEGREE COLLEGE"
  },
  {
    "name": "International Institute of Information Technology, Hyderabad"
  },
  {
    "name": "International School of Technology and Sciences for  Women"
  },
  {
    "name": "ISL Engineering College"
  },
  {
    "name": "Islamia Arabic College, Kurnool"
  },
  {
    "name": "Islamia Arts & Science College, Opp. MGM Hospital, Warangal  506 007"
  },
  {
    "name": "ISLAMIA COLLEEGE OF EDUCATION (B.Ed)"
  },
  {
    "name": "Islamia College of Education"
  },
  {
    "name": "ISLAMIA COLLEGE OF LAW    "
  },
  {
    "name": "Islamia Degree & P.G College"
  },
  {
    "name": "J C DIWAKAR REDDY HORTICULTURAL COLLEGE"
  },
  {
    "name": "J J College of Pharamcy"
  },
  {
    "name": "J.BEERA COLLEGE OF EDUCATION"
  },
  {
    "name": "J.C. College of Law, Guntur"
  },
  {
    "name": "J.C.Degree College"
  },
  {
    "name": "J.C.Diwakar Reddy Agricultural College, Tadiptri"
  },
  {
    "name": "J.C.N.R.M. Degree College, Tadipatri"
  },
  {
    "name": "J.D. College of Nursing, Kadapa"
  },
  {
    "name": "J.M.J. College for Women"
  },
  {
    "name": "J.R.R Navodaya Degree College, Gurazala"
  },
  {
    "name": "JAAMIA COLLEGE OF EDUCATION"
  },
  {
    "name": "JADHAV MANIKRAO DEGREE COLLEGE, INDRAVELLY"
  },
  {
    "name": "JADHAV RADHA BAI DEGREE COLLEGE, GUDIHATHNOOR"
  },
  {
    "name": "Jagan Degree & PG College, Nellore"
  },
  {
    "name": "Jagan's College of Pharmacy, Muthukur"
  },
  {
    "name": "JAGANS DEGREE COLLEGE MUTHUKURU"
  },
  {
    "name": "Jagans Degree College, Nellore"
  },
  {
    "name": "Jagan\u0092s Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Jagarlamudi Kuppuswamy Choudary College, Guntur"
  },
  {
    "name": "JAGATHGURU COLLEGE OF EDUCATION, SANIKAVARAM, PRAKASAM DISTRICT"
  },
  {
    "name": "JAGATHI DISABLED DEGREE COLLEGE (DEAF AND DUMB)"
  },
  {
    "name": "JAGRUTHI COLLEGE OF NURSING"
  },
  {
    "name": "Jagruthi Degree and P.G. College (Narayanguda)"
  },
  {
    "name": "Jagruthi Degree College"
  },
  {
    "name": "Jagruthi Degree College (Malkajgiri)"
  },
  {
    "name": "Jagruthi Degree College (Shankarpally)"
  },
  {
    "name": "JAGRUTHI DEGREE COLLEGE, 20-462, VIDYANAGAR, HUZURABAD"
  },
  {
    "name": "JAGRUTHI DEGREE COLLEGE, BHONGIR"
  },
  {
    "name": "JAGRUTHI PG COLLEGE, BHONGIR"
  },
  {
    "name": "Jagruthi Womens Degree College"
  },
  {
    "name": "Jagruti PG.College of Management Studies"
  },
  {
    "name": "Jahanavi Degree College (Narayanaguda)"
  },
  {
    "name": "Jahanavi Degree College (Secunderabad)"
  },
  {
    "name": "Jahanavi Degree College for Women"
  },
  {
    "name": "Jahanavi Institute of Hotel management"
  },
  {
    "name": "Jahnavi Degree College (Boduppal)"
  },
  {
    "name": "Jai Aruna Degreee College, Kothakota"
  },
  {
    "name": "JAI DURGA BHAVANI BEd COLLEGE"
  },
  {
    "name": "Jalagam Vengal Rao (JVR) Government College, Sathupally"
  },
  {
    "name": "Janahitha Degree College"
  },
  {
    "name": "JANARDHAN REDDY COLLEGE OF EDUCATION INDIRANAGAR COLONY, HUZURABAD"
  },
  {
    "name": "JANET DEGREE COLLEGE, KETHANKONDA, IBRAHIMPATNAM MANDAL"
  },
  {
    "name": "Jangaon College of Education, Jangaon"
  },
  {
    "name": "Jangaon Institute of Pharmaceutical Sciences, Jangaon, Warangal"
  },
  {
    "name": "JAVERA BED COLLEGE"
  },
  {
    "name": "Jawahar Bharathi Degree College, Kavali"
  },
  {
    "name": "JAWAHARLAL NEHRU COLLEGE OF EDUCATION MALLARAM ROAD VEMULAWADA"
  },
  {
    "name": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM"
  },
  {
    "name": "Jawaharlal Nehru Technological University, Anantapur"
  },
  {
    "name": "Jawaharlal Nehru Technological University, Hyderabad"
  },
  {
    "name": "Jawaharlal Nehru Technological University, Kakinada"
  },
  {
    "name": "JAWAHARLAR NEHRU COLLEGE OF EDUCATION MALLARAM RD, VEMULAWADA"
  },
  {
    "name": "Jawarharlal Nehru Architecture and Fine Art University Hyderabad"
  },
  {
    "name": "Jaya College of B.Sc Nursing, Hanumakonda"
  },
  {
    "name": "Jaya College of Nursing, Warangal"
  },
  {
    "name": "Jaya Inst. of Medical Lab Technology B.Sc MLT, Warangal"
  },
  {
    "name": "Jaya Prakash Narayan College of Engineering"
  },
  {
    "name": "Jaya Shekara College of Nursing, Ongole"
  },
  {
    "name": "Jayamukhi College of Education, Narsampet"
  },
  {
    "name": "Jayamukhi College of Pharmacy, Maqdumpur, Narsampet, Warangal"
  },
  {
    "name": "Jayamukhi Institute of Management Sciences, Maqdumpur, Narsampet, Warangal"
  },
  {
    "name": "Jayamukhi Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Jayamukhi Institute of Technological Sciences"
  },
  {
    "name": "JAYASREE DEGREE COLLEGE, KARIMNAGAR"
  },
  {
    "name": "JB Institute of Engineering & Technology"
  },
  {
    "name": "JBM DEGREE COLLEGE, NARAYANPUR"
  },
  {
    "name": "JBR ARCHITECTURE COLLEGE"
  },
  {
    "name": "JEC COLLEGE OF  EDUCATION, SAROORNAGAR"
  },
  {
    "name": "Jeevan Jyothi B.Sc Nursing College, Tenali"
  },
  {
    "name": "Jenila Varshini College of Education, Itha Nagar, Tenali, Guntur District"
  },
  {
    "name": "JEPHANYA INSTITUTE OF PARAMEDICAL EDUCATION AND REHABILITATION COLLEGE OF PHYSIOTHERAPY, TIRUPATI"
  },
  {
    "name": "JES College of Education"
  },
  {
    "name": "Jesus & Mary College of Education"
  },
  {
    "name": "JESUS DOGGA COLLEGE OF EDUCATION"
  },
  {
    "name": "Jesus P.G College"
  },
  {
    "name": "JESUS THE SAVIOUR OF NATIONS COLLEGE OF EDUCATION"
  },
  {
    "name": "JIMS HOMOEOPATHIC MEDICAL COLLEGE AND HOSPITAL"
  },
  {
    "name": "JJR COLLEGE OF EDUCATION"
  },
  {
    "name": "JMJ COLLEGE OF NURSING"
  },
  {
    "name": "JMJ College of Nursing, Hyderabad"
  },
  {
    "name": "JMJ Degree College for Women, Karunapuram, Peddapendial  506 151"
  },
  {
    "name": "JNIAS SCHOOL OF PLANNING AND ARCHITECTURE"
  },
  {
    "name": "JNTUA College of Engineering, Anantapur"
  },
  {
    "name": "JNTUA College of Engineering, Kalikiri"
  },
  {
    "name": "JNTUA College of Engineering, Pulivendula"
  },
  {
    "name": "JNTUA MBA, Anantapur"
  },
  {
    "name": "JNTUA Oil Technological and Pharmaceutical Research Institute"
  },
  {
    "name": "JNTUH College of Engineering Hyderabad"
  },
  {
    "name": "JNTUH College of Engineering Jagityala"
  },
  {
    "name": "JNTUH College of Engineering Manthani"
  },
  {
    "name": "JNTUH College of Engineering Sultanpur"
  },
  {
    "name": "JNTUH Institutte of Science and Technology"
  },
  {
    "name": "JNTUH UNIVERSITY COLLEGE  OF ENGINEERING RAJANNA SIRCILLA "
  },
  {
    "name": "JNTUH UNIVERSITY COLLEGE OF ENGINEERING MAHABUBABAD"
  },
  {
    "name": "JNTUH UNIVERSITY COLLEGE OF ENGINEERING PALAIR    "
  },
  {
    "name": "JNTUH UNIVERSITY COLLEGE OF ENGINEERING WANAPRTHY    "
  },
  {
    "name": "JNTUH-School of Information Technology, "
  },
  {
    "name": "Jogaiah Institute of Technology & Pharmacy Sciences, (CC-GC)"
  },
  {
    "name": "Joginpally B.R Engineering College"
  },
  {
    "name": "Joginpally B.R Pharmacy College"
  },
  {
    "name": "John Bauer College of Hotel Management"
  },
  {
    "name": "Joseph Sriharsha & Mary Indraja Educational Society's St. Mary's Group of Institutions"
  },
  {
    "name": "JOY KARTHIK DEGREE COLLEGE"
  },
  {
    "name": "JRR B.Ed College, Cumbum"
  },
  {
    "name": "JSPS GOVERNMENT HOMOEOPATHIC MEDICAL COLLEGE, RAMANTHPUR"
  },
  {
    "name": "JUSTICE KUMARAIAH COLLEGE OF LAW, MUKTESHWARA COMPLEX, M.M. THOTA, KARIMNAGAR"
  },
  {
    "name": "JVR Pragathi Degree College, # 3-97, Near Bus Stand, Kusumanchi"
  },
  {
    "name": "JVRRM College of  Education, Nandyal"
  },
  {
    "name": "JYOTHI COLLEGE OF EDUCATION, THADOOR (V), SIRCILLA (M), KNR"
  },
  {
    "name": "Jyothirmayee Degree College for Women, Kalyandurg"
  },
  {
    "name": "JYOTHISHMATHI COLLEGE OF EDUCATION, RAMAKRISHNA COLONY, NUSTULAPUR, KARIMNAGAR"
  },
  {
    "name": "Jyothishmathi Institute of Technological Sciences, Thimmapur"
  },
  {
    "name": "Jyothishmathi Institute of Technology & Science, Nusthulapur"
  },
  {
    "name": "Jyothismathi Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Jyothisri College of Education, Kandulapuram, Cumbum"
  },
  {
    "name": "K B REDDY COLLEGE OF EDUCATION, NAIDUPET"
  },
  {
    "name": "K C REDDY INSTITUTE OF PHARMACEUTICAL SCIENCES    "
  },
  {
    "name": "K Chandrakala PG College, Tenali"
  },
  {
    "name": "K L R DEGREE COLLEGE"
  },
  {
    "name": "K NARAYANA MEMORIAL COLLEGE OF EDUCATION"
  },
  {
    "name": "K R K REDDY COLLEGE OF EDUCATION"
  },
  {
    "name": "K S R DEGREE COLLEGE"
  },
  {
    "name": "K.A. & H.L. DEGREE COLLEGE"
  },
  {
    "name": "K.B.N. COLLEGE"
  },
  {
    "name": "K.G Reddy College of Engineering & Technology"
  },
  {
    "name": "K.G.R Institute of Technology & Management"
  },
  {
    "name": "K.G.R.DEGREE COLLEGE"
  },
  {
    "name": "K.G.R.L. COLLEGE"
  },
  {
    "name": "K.G.R.L. College Of Pharmacy"
  },
  {
    "name": "K.H. Government Degree College, Dharmavaram"
  },
  {
    "name": "K.K.C. College of B.Sc Nursing, Puttur"
  },
  {
    "name": "K.K.C. College of Education, Puttur"
  },
  {
    "name": "K.K.C. College of Law, Puttur"
  },
  {
    "name": "K.L.R. Degree College, Giddaluru"
  },
  {
    "name": "K.M.M. College of Education, Ramireddypalli, Narasingapuram (post)"
  },
  {
    "name": "K.R.R Institute of Information Technology"
  },
  {
    "name": "K.S.N. Government Degree College for Women, Anantapur"
  },
  {
    "name": "K.S.N.R. DEGREE COLLEGE"
  },
  {
    "name": "K.S.R & K.R.K College of Education, Tenali"
  },
  {
    "name": "K.S.R B.ED COLLEGE, CUMBUM"
  },
  {
    "name": "K.S.R.M. College of Engineering"
  },
  {
    "name": "K.S.R.M. College of Management Studies"
  },
  {
    "name": "K.T.R.WOMEN'S COLLEGE"
  },
  {
    "name": "K.T.S. Government Degree College, Rayadurg"
  },
  {
    "name": "K.V. Ranga Reddy Degree College for Women"
  },
  {
    "name": "K.V.K College of Pharmacy"
  },
  {
    "name": "K.V.R. COLLEGE"
  },
  {
    "name": "K.V.R., K.VR. & M.K.R College"
  },
  {
    "name": "K.V.Subba Reddy Degree College,"
  },
  {
    "name": "Kadiri Babu Rao College For Agriculture"
  },
  {
    "name": "KADIRI BABURAO COLLEGE OF HORTICULTURE"
  },
  {
    "name": "Kakatiya College of Physiotherapy, Warabgal"
  },
  {
    "name": "KAKATIYA DEGREE COLLEGE(597)"
  },
  {
    "name": "KAKATIYA DEGREE COLLEGE,  SANGEM"
  },
  {
    "name": "Kakatiya Degree College, Dakkili"
  },
  {
    "name": "KAKATIYA DEGREE COLLEGE, GOVINDARAOPET"
  },
  {
    "name": "KAKATIYA DEGREE COLLEGE, NALGONDA"
  },
  {
    "name": "Kakatiya Degree College, Podalakur"
  },
  {
    "name": "Kakatiya Degree College, Post Office Road, Sathupally (SHR)"
  },
  {
    "name": "Kakatiya Government College, Hanamkonda  506 001"
  },
  {
    "name": "KAKATIYA INSTITUTE AND MANAGEMENT STUDIES, KOTHAPALLY (H), KARIMNAGAR"
  },
  {
    "name": "Kakatiya Institute of Management Studies(MBA)"
  },
  {
    "name": "Kakatiya Institute of Technolgy & Science for Women"
  },
  {
    "name": "Kakatiya Institute of Technology & Science, Yerragattu Hillocks, Bheemaram, Hasanparthy, Warangal"
  },
  {
    "name": "Kakatiya Mahila Degree College, Kaoji Sgtreet, Nakkalagutta, Hanamkonda"
  },
  {
    "name": "Kakatiya Medical College, Warangal"
  },
  {
    "name": "KAKATIYA PG COLLEGE NALGONDA"
  },
  {
    "name": "Kakatiya University College of Engineering and Technology"
  },
  {
    "name": "Kakatiya University, Warangal"
  },
  {
    "name": "KAKINADA ADITYA DEGREE COLLEGE"
  },
  {
    "name": "KAKINADA COLLEGE OF EDUCATION"
  },
  {
    "name": "Kakinada Institute of Engineering & Technology - II, Yanam Road, Korangi, Tallarevu Mandal, PIN-  533461(CC-6Q)"
  },
  {
    "name": "Kakinada Institute of Engineering & Technology for Women, Yanam Road, Tallarevu(M), Korangi, Kakinada. PIN-533461.  (CC-JN))"
  },
  {
    "name": "Kakinada Institute of Engineering & Technology, Kiet, Korangi, Yanam Road, Kakinada.PIN-533461  (CC-B2)"
  },
  {
    "name": "Kakinada Institute of Technological Sciences,A Agraharam(V), Ramachandrapuram-533255   (CC-JP)"
  },
  {
    "name": "Kakinada Institute of Technology & Science,Tirupathi Village, Divilli, Peddampuram (M), Pin-533433  (CC-JQ)"
  },
  {
    "name": "KAKINADA SRI ADITYA DEGREE COLLEGE "
  },
  {
    "name": "Kalam B.Ed College, Kanigiri"
  },
  {
    "name": "Kalanjali College of Nursing, Hyderabad"
  },
  {
    "name": "KALANJALI INSTITUTE OF MEDICAL SCIENCES NURSING COLLEGE "
  },
  {
    "name": "Kalikamba College of Education, Chirala"
  },
  {
    "name": "KALLAM HARANADHAREDDY INSTITUTE OF TECHNOLOGY"
  },
  {
    "name": "KALOJI NARAYANA RAO UNIVERSITY OF HEALTH SCIENCES"
  },
  {
    "name": "Kalyani MCA College, Eethamukkala"
  },
  {
    "name": "Kamala College of Education, Markapur"
  },
  {
    "name": "Kamala Institute of Technology & Science"
  },
  {
    "name": "Kamineni Academy of Medical Sciences and Research Centre"
  },
  {
    "name": "Kamineni College of Nursing, Hyderabad"
  },
  {
    "name": "Kamineni Inst. of Dental Sciences, Narketpally"
  },
  {
    "name": "Kamineni Inst. of Medical Sciences, College of Nursing, Narketpally"
  },
  {
    "name": "Kamineni Inst. of Medical Sciences, Narketpally"
  },
  {
    "name": "Kamineni Inst. of Paramedical Sciences, Nalgonda"
  },
  {
    "name": "Kamineni Institute of Paramedical Sciences (B.Sc MLT), Hyderabad"
  },
  {
    "name": "Kandula Lakshumma College of Egg. for Women"
  },
  {
    "name": "Kanishka Womens Degree College, Bheemaram"
  },
  {
    "name": "Karanam Padmavathi Memorial Degree & P.G College"
  },
  {
    "name": "Karimala Sai Degree College,  6-60, Beet Bazar, Luxettipet"
  },
  {
    "name": "Karshak B.Ed College, Kamareddy (5283)"
  },
  {
    "name": "Karthikeya Degree College"
  },
  {
    "name": "KARTHIKEYA DEGREE COLLEGE KOWTHALAM"
  },
  {
    "name": "Karuna P.G. College of Business Management"
  },
  {
    "name": "Karunya College of Education"
  },
  {
    "name": "KASIREDDY BUTCHI RAJU DEGREE COLLEGE YELLAMANCHILLI"
  },
  {
    "name": "Kasireddy Narayan Reddy College of Engineering & Research"
  },
  {
    "name": "Kasturba Gandhi Degree & PG College for Women"
  },
  {
    "name": "Kasturi College of Physiotherapy, Anantapur"
  },
  {
    "name": "Kasturibai College of Education"
  },
  {
    "name": "Kasu Brahmananda Reddy Degree College, Narasaraopeta"
  },
  {
    "name": "Katipally Ravinder Reddy College of Education, Nizamabad (5284)"
  },
  {
    "name": "Katrina Moller College of Nursing, Arogyavaram"
  },
  {
    "name": "Katriya Institute of Excellence in Hotel Management"
  },
  {
    "name": "KATTUPALLI YOHAN COLLEGE OF EDUCATION, Bhattiprolu"
  },
  {
    "name": "Katuri College of Nursing, Guntur"
  },
  {
    "name": "Katuri Medical College, Guntur"
  },
  {
    "name": "Kavitha Degree College, Upendrayya Nagar, Khammam"
  },
  {
    "name": "KAVITHA MEMORIAL COLLEGE OF EDUCATION "
  },
  {
    "name": "Kavitha Memorial Degree College, NST Road, Khammam"
  },
  {
    "name": "Kavitha Memorial P.G. College, NST Road, Khammam"
  },
  {
    "name": "Kavitha PG College"
  },
  {
    "name": "Kavuri Subba Rao College of Nursing, Guntur"
  },
  {
    "name": "KBR Engineering College"
  },
  {
    "name": "KCREDDY COLLEGE OF NURSING"
  },
  {
    "name": "Keerthana Degree College,  Bela (V&M)"
  },
  {
    "name": "KEERTHI DEGREE COLLEGE"
  },
  {
    "name": "KEN Degree College"
  },
  {
    "name": "KESHAV MEMORIAL COLLEGE OF LAW"
  },
  {
    "name": "KESHAV MEMORIAL ENGNEERING COLLEGE"
  },
  {
    "name": "Keshav Memorial Institute of Commerce and Sciences"
  },
  {
    "name": "KESHAV MEMORIAL INSTITUTE OF MANAGEMENT"
  },
  {
    "name": "Keshav Memorial Institute of Technology"
  },
  {
    "name": "KESHAVA DEGREE COLLEGE"
  },
  {
    "name": "KGR B.ED COLLEGE, Darsi"
  },
  {
    "name": "KGRL College (PG Courses)"
  },
  {
    "name": "Khader Memorial College of Engineering & Technology"
  },
  {
    "name": "Khammam College of Pharmacy, Allipuram (V), Khammam"
  },
  {
    "name": "KIMS College of B.Sc Nursing, Hyderabad"
  },
  {
    "name": "KIMS COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "KIMS COLLEGE OF LAW"
  },
  {
    "name": "KIMS College of Nursing & Research Foundation, Amalapuram"
  },
  {
    "name": "KIMS COLLEGE OF NURSING , ONGOLE"
  },
  {
    "name": "KIMS DEGREE & PG COLLEGE, NEAR BUS STAND, OPP. KALABHARATHI LANE, KARIMNAGAR"
  },
  {
    "name": "KIMS DENTAL COLLEGE And HOSPITAL"
  },
  {
    "name": "Kingston College of Education"
  },
  {
    "name": "Kingston P.G. College"
  },
  {
    "name": "Kinnera College of Nursing, Khammam"
  },
  {
    "name": "KIRANMAI DEGREE COLLEGE"
  },
  {
    "name": "KITES COLLEGE OF BSC MLT"
  },
  {
    "name": "KITES COLLEGE OF NURSING ATCHUTHAPURAM ANAKAPALLI"
  },
  {
    "name": "KITES DEGREE COLLEGE, ATCHUTHAPURAM (CODE 375)"
  },
  {
    "name": "KITS College of Pharmacy for Women"
  },
  {
    "name": "KJR COLLEGE OF PHARMACY"
  },
  {
    "name": "KKC COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "KKC HOMOEOPATHI MEDICAL COLLEGE"
  },
  {
    "name": "KKC Institute of PG Stuides, Puttur"
  },
  {
    "name": "KKR&KSR Institute of Technology & Sciences, VINJANAMPADU Village (CC-JR)"
  },
  {
    "name": "KLR College of Education, Paloncha"
  },
  {
    "name": "KLR COLLEGE OF EDUCATION,GIDDALUR"
  },
  {
    "name": "KLR College of Engineering & Technology"
  },
  {
    "name": "KLR College of Pharmacy, Paloncha, Khammam District"
  },
  {
    "name": "KLR COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "KLR Degree College, Ambedkar Centre, Paloncha"
  },
  {
    "name": "KLR DEGREE COLLEGE, SHAMIRPET"
  },
  {
    "name": "KML DEGREE COLLEGE SABBAVARAM"
  },
  {
    "name": "KMM Institute of P.G. Studies, Ramireddi Palle, Tirupati"
  },
  {
    "name": "KMM Institute of Technology & Science, Tirupathi"
  },
  {
    "name": "KMR COLLEGE OF EDUCATION"
  },
  {
    "name": "KMR COLLEGE OF NURSING "
  },
  {
    "name": "KMR COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "KMR INSTITUTE OF MEDICAL SCIENCES NANDIGAMA"
  },
  {
    "name": "KNM GOVT. DEGREE COLLEGE, MIRYALGUDA"
  },
  {
    "name": "KNR Degree College, 14-52, Khanapur (V&M)"
  },
  {
    "name": "Kodada Institute of Technology &Science for Women"
  },
  {
    "name": "KODI RAMA MURTHY COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "KOMATIREDDY PRATHEEK REDDY MEMORIAL DEGREE COLLEGE"
  },
  {
    "name": "Kommuri Pratap Reddy Institute of Technology"
  },
  {
    "name": "Konaseema Inst. of Medical Sciences Research Foundation, Amalapuram"
  },
  {
    "name": "Konaseema Institute of Medical Sciences (B.Sc MLT), Amalapuram"
  },
  {
    "name": "Konaseema Institute of Medical Sciences (BPT), Amalapuram"
  },
  {
    "name": "KonchadaRajeswaraRao Degree College, Sompeta"
  },
  {
    "name": "KONDAVEETI DEGREE COLLEGE-404 GOPALAPURAM"
  },
  {
    "name": "KONERU LAKSHMAIAH EDUCATION FOUNDATION (DEEMED TO BE UNIVERSITY ) OFF CAMPUS, HYDERABAD"
  },
  {
    "name": "Koneru Lakshmaiah Education Foundation,Guntur"
  },
  {
    "name": "Konijeti Rosaiah Siva Lakshmi College, Bapatla"
  },
  {
    "name": "Koringa College Of Pharmacy"
  },
  {
    "name": "KORM College of Engineering"
  },
  {
    "name": "Kotha Hanumaiah & Lakshmi Kotamma Degree College, Piduguralla"
  },
  {
    "name": "Kotha Kota Sri Vidya Degree College, Kothakota"
  },
  {
    "name": "Kottam Institute of Pharmacy"
  },
  {
    "name": "KPN College of Education"
  },
  {
    "name": "KPRIT COLLEGE OF ENGINEERING"
  },
  {
    "name": "KPs Twenty first Century Degree College"
  },
  {
    "name": "Kranthi (Alpha) Degree College"
  },
  {
    "name": "KRANTHI DEGREE COLLEGE"
  },
  {
    "name": "KREA UNIVERSITY"
  },
  {
    "name": "Krishna Chaitanya Degree and PG College, Buchireddypalem"
  },
  {
    "name": "KRISHNA CHAITANYA DEGREE COLLEGE, KANIGIRI"
  },
  {
    "name": "Krishna Chaitanya Degree College, Nellore"
  },
  {
    "name": "Krishna Chaitanya Institute of Science & Technology, Kakatur"
  },
  {
    "name": "Krishna chaitanya Institute of Technology & Sciences, Jawayar nagar , MarkapurPIN-523316(CC-JU)"
  },
  {
    "name": "Krishna Degree College"
  },
  {
    "name": "Krishna Institute of Medical Sciences (KIMS) College of B.Sc MLT, Hyderabad"
  },
  {
    "name": "Krishna Institute of Medical Sciences College of Physiotherapy, Secunderabad"
  },
  {
    "name": "KRISHNA SAI DEGREE COLLEGE"
  },
  {
    "name": "Krishna Saradha Degree college"
  },
  {
    "name": "Krishna Teja Degree College, Tirupati"
  },
  {
    "name": "KRISHNA TEJA HOTEL MANAGEMENT"
  },
  {
    "name": "Krishna Teja Pharmacy College, Tirupati"
  },
  {
    "name": "KRISHNA UNIVERSITY Dr. MRAR  PG CENTRE, NUZVID"
  },
  {
    "name": "Krishna University, Machhlipattanam"
  },
  {
    "name": "Krishnamurthy Institute of Management"
  },
  {
    "name": "Krishnaveni Arts & Science Degree College, H.No. 1-17, Ambedkar Centre, Manuguru"
  },
  {
    "name": "Krishnaveni College of Nursing, Guntur"
  },
  {
    "name": "Krishnaveni Degree College for Women, Narasaraopeta"
  },
  {
    "name": "Krishnaveni Degree College, Laxmidevipally, Kothagudem"
  },
  {
    "name": "Krishnaveni Degree College, Narasaraopeta"
  },
  {
    "name": "Krishnaveni Degree College, Vidyanagar, Adilabad (Manjeera)"
  },
  {
    "name": "Krishnaveni Degree College, Vinukonda"
  },
  {
    "name": "Krishnaveni Engineering College for Women, Kesanupalli(Post), Narasaraopet,  PIN - 522 601(CC-KC)"
  },
  {
    "name": "Kristhu Jyothi Degree College, Reddygudem, Thallada, Khammam"
  },
  {
    "name": "KRK Govt. Degree College, Addanki"
  },
  {
    "name": "KRR GOVERNMENT ARTS & SCIENCE COLLEGE, KODAD"
  },
  {
    "name": "Ksatriya College of Engineering"
  },
  {
    "name": "Kshna Chaitanya Institute of Management, Devarajugattu(CC-2Y)"
  },
  {
    "name": "KSK COLLEGE OF EDUCATION, Bhattiprolu"
  },
  {
    "name": "KSK Degree College, Bhattiprolu"
  },
  {
    "name": "KSR Degree College for Women, D.No. 19-214,Warangal Road, Narsampet"
  },
  {
    "name": "Kugler College of Nursing, Guntur"
  },
  {
    "name": "Kugler Memorial Physiotherapy Degree College, Guntur"
  },
  {
    "name": "KUMUDINI DEVI COLLEGE OF NURSING"
  },
  {
    "name": "KUPPAM COLLEGE OF NURSING"
  },
  {
    "name": "Kuppam Degree College, Kuppam"
  },
  {
    "name": "Kuppam Engineering College. Chittoor"
  },
  {
    "name": "KURLI ANNAPURANAMMA RAMIREDDY DEGREE COLLEGE "
  },
  {
    "name": "Kurnool Degree College,"
  },
  {
    "name": "Kurnool Medical College, Kurnool"
  },
  {
    "name": "KV Ranga Reddy Law College"
  },
  {
    "name": "KVM COLLEGE OF PHYSICAL EDUCATION, KULKACHERLA"
  },
  {
    "name": "KVR Govt. Degree College for Women"
  },
  {
    "name": "KVSR SIDDHARTHA COLLEGE OF PHARMACEUTICAL SCIENCES"
  },
  {
    "name": "L.N. Gupta Degree College"
  },
  {
    "name": "Lahoti Degree College, Kondanagal"
  },
  {
    "name": "Lakireddy Bali Reddy College of Engineering, L.B. Reddy Nagar, Mylavaram, PIN-521230(CC-76)"
  },
  {
    "name": "LAKSHMI NARASIMHA B.ED COLLEGE, Darsi"
  },
  {
    "name": "Lakshmi Narsimha College of Education, Narasaraopeta"
  },
  {
    "name": "LAKSHMI SAVITRAMMA COLLEGE OF NURSING, KL PURAM, VIZIANAGARAM DISTRICT"
  },
  {
    "name": "Lakshmi Venkatesh TG College of Nursing, Kurnool"
  },
  {
    "name": "Lakshya College of Commerce "
  },
  {
    "name": "Lal Bahadur College of Education, Warangal"
  },
  {
    "name": "Lal Bahadur College, Sardar Patel Road, Warangal  506 007"
  },
  {
    "name": "Lal Bahadur Degree College"
  },
  {
    "name": "Lal Bahadur P.G. College(MBA), S.V.P. Road, Warangal"
  },
  {
    "name": "Lal Bahadur P.G. College, S.V.P. Road, Warangal"
  },
  {
    "name": "Lalitha College of Nursing, Guntur"
  },
  {
    "name": "LAMP Degree College"
  },
  {
    "name": "Lateefia Arabic College"
  },
  {
    "name": "Lendi Institute of Engineering & Technology, Jonnada (V), Denkada mandal, PIN- 535005 (CC-KD)"
  },
  {
    "name": "Lendy Degree College, Nellore"
  },
  {
    "name": "LENORA COLLEGE OF EDUCATION"
  },
  {
    "name": "Lenora College of Engineering, Rampachodavaram,PIN- 533288(CC-96)"
  },
  {
    "name": "Lenora Institute of Dental Sciences, Rajahmundry"
  },
  {
    "name": "Leo Academy of Hospitality & Tourism Management"
  },
  {
    "name": "Lepakshi Degree College"
  },
  {
    "name": "LEVAKU NARAPU REDDY COLLEGE OF EDUCATION"
  },
  {
    "name": "LIMRA DEGREE COLLEGE"
  },
  {
    "name": "Lingayas Institute of Management & Technology,  Madalavarigudem(V), Via Nunna,  Gannavaram Mandal, Vijayawada , PIN-521212(CC-NA)"
  },
  {
    "name": "Little Flower Degree College"
  },
  {
    "name": "Little Flower Degree College"
  },
  {
    "name": "LITTLE FLOWER DEGREE COLLEGE"
  },
  {
    "name": "LITTLE ROSE COLLEGE OF EDUCATION"
  },
  {
    "name": "Little Rose Degree College"
  },
  {
    "name": "LMA DEGREE COLLEGE (NAGARJUNA HILLS)"
  },
  {
    "name": "LMN College of Education, Markapur"
  },
  {
    "name": "LMR DEGREE COLLEGE, KANNAPUR KADAM(M)"
  },
  {
    "name": "Ln.G.V.Rao Modern Degree College"
  },
  {
    "name": "LNR COLLEGE OF EDUCATION"
  },
  {
    "name": "Lords Institute of Engineering & Technology"
  },
  {
    "name": "Loyola Academy"
  },
  {
    "name": "LOYOLA COLLEGE OF EDUCATION, REKURTHI, MALKAPUR (P), KARIMNAGAR"
  },
  {
    "name": "Loyola Degree College"
  },
  {
    "name": "Loyola Institute of Technology and Management, Loyola Nagar, Dhulipalla (Village), Sattenapalli (Mandal),  PIN-522412(CC-A4)"
  },
  {
    "name": "LVR DEGREE COLLEGE"
  },
  {
    "name": "LYDIA COLLEGE OF PHARMACY"
  },
  {
    "name": "M .R.GOVERNMENT  SANSKRIT  COLLEGE "
  },
  {
    "name": "M C Gupta College of Business Management"
  },
  {
    "name": "M S Degree College for Women (Masabtank), Hyd"
  },
  {
    "name": "M S Degree College for Women (Nalgonda X Roads)"
  },
  {
    "name": "M S Degree College for Women (Shalibanda)"
  },
  {
    "name": "M S Degree College for Women (Tolichowki)"
  },
  {
    "name": "M.A.M College of Education, Kesanupalli, Narasaraopeta"
  },
  {
    "name": "M.C.Gupta College of Business Management"
  },
  {
    "name": "M.J.R. College of Engineering & Technology, Pulicherla"
  },
  {
    "name": "M.L.R. NAIDU DEGREE COLLEGE"
  },
  {
    "name": "M.R. College of Pharmacy"
  },
  {
    "name": "M.R.M  Institute of Management (Ibrahimpatnam)"
  },
  {
    "name": "M.R.R.College of Pharmacy, Near DSP Office, Madhira Road, Nandigamma,PIN-522185(CC-PJ)"
  },
  {
    "name": "M.S. Degree College, Gooty"
  },
  {
    "name": "M.S.N.Degree College"
  },
  {
    "name": "M.S.R. Degree College, Bapatla"
  },
  {
    "name": "M.S.R.S. Siddhardha Degree College"
  },
  {
    "name": "M.S.S.Degree College"
  },
  {
    "name": "M.V.N.J.S & R.V.R Degree College"
  },
  {
    "name": "M.V.R Degree College, Karlapalem"
  },
  {
    "name": "M.V.R. DEGREE COLLEGE"
  },
  {
    "name": "M.V.R.Degree College"
  },
  {
    "name": "M.V.R.S. Viveka Degree College, Tenali"
  },
  {
    "name": "M.V.S. Government Arts & Science College, Mahabubnagar"
  },
  {
    "name": "MAA COMMERCE & SCIENCE DEGREE COLLEGE"
  },
  {
    "name": "MAA INSTITUTE OF SPEECH AND HEARING "
  },
  {
    "name": "Madala Sakuntala Bhaskar College of Nursing, Guntur"
  },
  {
    "name": "Madanapalle Institute of Technology & Science, Madanapalle"
  },
  {
    "name": "Madeena B.Ed. College, Kothagudem"
  },
  {
    "name": "MADHIRA INSTITUTE OF TECHNOLOGY & SCIENCE, KODAD"
  },
  {
    "name": "Madhira Institute of Technology and Sciences"
  },
  {
    "name": "Madhu College of Education"
  },
  {
    "name": "Madhu College of Nursing, Nandyal"
  },
  {
    "name": "MADHU DEGREE COLLEGE(589)"
  },
  {
    "name": "MADHURAI MEENAKSHI DEGREE COLLEGE"
  },
  {
    "name": "Madina College of Education, Brambanakotkur"
  },
  {
    "name": "Madina Degree College"
  },
  {
    "name": "MADONA DEGREE COLLEGE FOR DEAF"
  },
  {
    "name": "Madura Sai Institute of IT & Management, Proddutur"
  },
  {
    "name": "MAESTRO SCHOOL OF PLANNING AND  ARCHITECTURE"
  },
  {
    "name": "MAGUNTA SUBBARAMA REDDY DEGREE COLLEGE KONDAPI"
  },
  {
    "name": "MAHALAKSHMI DEGREE COLLEGE ,UMDAM TALAMADUGU ADILABAD"
  },
  {
    "name": "MAHAMMAD GHORI COLLEGE OF EDUCATION, KANDULAPURAM, CUMBUM, PRAKASAM DIST"
  },
  {
    "name": "Mahammod College of Education"
  },
  {
    "name": "Maharaj Vijayaram Gajapathi Raj College of Engineering, Chintalavalasa, Vizianagaram-535005 (CC-33)"
  },
  {
    "name": "Maharaja Inst. of Homoeopathy Sciences, Nellimarla"
  },
  {
    "name": "Maharaja Inst. of Medical Sciences, Vizianagaram"
  },
  {
    "name": "Maharajah's college (Autonomous) "
  },
  {
    "name": "Maharajahs PG College"
  },
  {
    "name": "MAHARSHI DEGREE COLLEGE"
  },
  {
    "name": "Maharshi Degree College"
  },
  {
    "name": "MAHARSHI DEGREE COLLEGE,  GODAVARIKHANI"
  },
  {
    "name": "MAHARSHI DEGREE COLLEGE, DOMMERAPOCHAMPALLY"
  },
  {
    "name": "Maharshi Degree College, H.No. 2-77/8, Santhoshnager, Ameenapuram, Kesamudram 506 112"
  },
  {
    "name": "Maharshi Degree College, H.No. 21-37/8, Cherial (V&M), Warangal District"
  },
  {
    "name": "Maharshi Degree College, H.No. 4-73/2, Main Road, Palakurthy (V&M)"
  },
  {
    "name": "Maharshi Degree College, Mulug  506 343"
  },
  {
    "name": "MAHARSHI DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "Mahathi Degree College"
  },
  {
    "name": "MAHATHI WOMENS DEGREE COLLEGE,SIRCILLA"
  },
  {
    "name": "Mahathma Degree College, Uravakonda"
  },
  {
    "name": "Mahati College of Pharmacy, Madanaplle"
  },
  {
    "name": "MAHATMA COLLEGE OF NURSING"
  },
  {
    "name": "Mahatma Gandhi College of Law"
  },
  {
    "name": "Mahatma Gandhi College, Guntur"
  },
  {
    "name": "Mahatma Gandhi Institute of Technology"
  },
  {
    "name": "MAHATMA GANDHI INSTITUTE OF TECHNOLOGY"
  },
  {
    "name": "Mahatma Gandhi University, Nalgonda"
  },
  {
    "name": "MAHATMA JYOTHIBA PHULE TELANGANA BC WELFARE RESIDENTIAL DEGREE COLLEGE FOR MEN MEDAK"
  },
  {
    "name": "MAHATMA JYOTHIBA PHULE TELANGANA BC WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "MAHATMA JYOTIBA PHULE TELANGANA BACKWARD CLASSES WELFARE RESIDENTIAL DEGREE COLLEGE FOR MEN, YELLAREDDYPET"
  },
  {
    "name": "MAHATMA JYOTIBA PHULE TELANGANA BACKWARD CLASSES WELFARE RESIDENTIAL DEGREE COLLEGE FOR MEN,KANDUKUR"
  },
  {
    "name": "MAHATMA JYOTIBA PHULE TELANGANA BACKWARD CLASSES WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN HYDERABAD"
  },
  {
    "name": "MAHATMA JYOTIBA PHULE TELANGANA BACKWARD CLASSES WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN MEDCHAL"
  },
  {
    "name": "MAHAVEER DEGREE COLLEGE OF ARTS, COMMERCE & SCIENCE, RAJENDRANAGAR"
  },
  {
    "name": "Mahaveer Institute of Science &Technology"
  },
  {
    "name": "MAHAVIR INSTITUTE OF MEDICA SCIENCES "
  },
  {
    "name": "MAHBOOBIA PANJETAN DEGREE COLLEGE"
  },
  {
    "name": "Mahbub Degree College"
  },
  {
    "name": "MAHENDRA DEGREE COLLEGE"
  },
  {
    "name": "Maheshwara College of Education, Maheshwaram, Narsampet"
  },
  {
    "name": "MAHESHWARA MEDICAL COLLEGE"
  },
  {
    "name": "Maheswari College Of Education"
  },
  {
    "name": "MAHILA DAKSHATA SAMITHI AND BANSILAL MALANI COLLEGE OF NURSING"
  },
  {
    "name": "MAHINDRA UNIVERSITY"
  },
  {
    "name": "Maitreyi Degree College for Women"
  },
  {
    "name": "MAK COLLEGE OF PHARMACY, CHILKOOR"
  },
  {
    "name": "MALD Govt. Degree College, Gadwal"
  },
  {
    "name": "MALINENI LAAKSHMAIAH WOMEN'S ENGINEERING COLLEGE, PULLADIGUNTA (V), VATTICHERUKURU (M),PIN-522017  (CC-KE)"
  },
  {
    "name": "Malineni Lakshmaiah B.Ed College, Singarayakonda"
  },
  {
    "name": "Malineni Lakshmaiah MBA College, Kanumall, (Vil),  PIN-523101(CC-2T)"
  },
  {
    "name": "MALINENI PERUMALLU EDUCATIONAL SOCIETY'S GROUP OF INSTITUTIONS (INTIGRATED CAMPUS) PULLADIGUNTA (V), VATTICHERUKURU (M), PIN-522017  (CC-7W)"
  },
  {
    "name": "Malineni Suseelamma Women's Engineering College, Kanumalla(Vil), Singarayakonda,(Md),PIN-523101(CC-85)."
  },
  {
    "name": "MALLA REDDY COLLEGE OF EDUCATION (B.Ed)"
  },
  {
    "name": "Malla Reddy College of Engineering"
  },
  {
    "name": "Malla Reddy College of Engineering & Technology"
  },
  {
    "name": "Malla Reddy College of Engineering for women"
  },
  {
    "name": "Malla Reddy College of Pharmacy"
  },
  {
    "name": "Malla Reddy Dental College for Women"
  },
  {
    "name": "Malla Reddy Engineering College"
  },
  {
    "name": "Malla Reddy Engineering College and Management Sciences"
  },
  {
    "name": "Malla Reddy Engineering College for women"
  },
  {
    "name": "Malla Reddy Institute of Dental Sciences"
  },
  {
    "name": "Malla Reddy Institute of Engineering and Technology"
  },
  {
    "name": "Malla Reddy Institute of Management"
  },
  {
    "name": "Malla Reddy Institute of Medical Sciences"
  },
  {
    "name": "Malla Reddy Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Malla Reddy Institute of Technology"
  },
  {
    "name": "Malla Reddy Institute of Technology & Sciences"
  },
  {
    "name": "Malla Reddy Medical College for Women"
  },
  {
    "name": "MALLA REDDY PHARMACY COLLEGE ( FORMERLY CM COLLEGE OF PHARMACY)"
  },
  {
    "name": "MALLA REDDY UNIVERSITY"
  },
  {
    "name": "Malla Reddy Vishwavidyapeeth"
  },
  {
    "name": "Mallareddy College of Nursing, Suraram, Hyderabad"
  },
  {
    "name": "Mallareddy College of Teacher Education (B.Ed & M.Ed)_kompally"
  },
  {
    "name": "MAM POLYTECHNIC OF AGRICULTURE, KESALUPALLI, NARASARAOPETA"
  },
  {
    "name": "MAMATA ACADEMY OF MEDICAL SCIENCES"
  },
  {
    "name": "Mamata College of Nursing, Khammam"
  },
  {
    "name": "Mamata College of Nursing, Tenali"
  },
  {
    "name": "Mamata Dental College, Khammam"
  },
  {
    "name": "MAMATA INSTITUTE OF DENTAL SCIENCES"
  },
  {
    "name": "Mamata Medical College, Khammam"
  },
  {
    "name": "MAMATA NURSING COLLEGE"
  },
  {
    "name": "Man Power Development College"
  },
  {
    "name": "MANAIR COLLEGE OF EDUCATION, KARIMNAGAR"
  },
  {
    "name": "Manair College of Law, V.V. Palem, Khammam"
  },
  {
    "name": "Manasa College of Education, Kothakota"
  },
  {
    "name": "Mancherial Institute of Mathematical Sciences,#20-531,Indira Nagar,Mancherial"
  },
  {
    "name": "Mancherial Vidyaniketan Degree College,  Mancherial(119)"
  },
  {
    "name": "Mandava Institute of Engineering and Technology"
  },
  {
    "name": "Mandyam College of Nursing, Tirupati"
  },
  {
    "name": "Mangalakara Degree College, Jagaraju Palli"
  },
  {
    "name": "Manisha College of Nursing, Visakhapatnam"
  },
  {
    "name": "Manjeera College of Education"
  },
  {
    "name": "Manjeera Degree College (Patancheru)"
  },
  {
    "name": "Manjeera Degree College, Kamareddy (5015)"
  },
  {
    "name": "MANTRA School of Business Management"
  },
  {
    "name": "MANUU POLYTECHNIC, HYDERABAD"
  },
  {
    "name": "MANUU POLYTECHNIC, KADAPA"
  },
  {
    "name": "Marathi Maha Vidyalaya"
  },
  {
    "name": "Margadarshi College of Education, Mahabubabad"
  },
  {
    "name": "Margadarsi    Degree  College,Piler"
  },
  {
    "name": "MARIS STELLA COLLEGE"
  },
  {
    "name": "Marri Educational Society's Marri Laxman Reddy Institute of Technology and Management"
  },
  {
    "name": "MARRIGUDA DEGREE COLLEGE, MARRIGUDA"
  },
  {
    "name": "MARTHA COLLEGE OF NURSING, THUMMAPUDI"
  },
  {
    "name": "MARUTHI COLLEGE OF NURSING"
  },
  {
    "name": "MARUTHI PARAMEDICAL ACADEMY"
  },
  {
    "name": "MARUTI DEGREE COLLEGE"
  },
  {
    "name": "MARVEL DEGREE COLLEGE"
  },
  {
    "name": "Marwadi Siksha Samithi Law College"
  },
  {
    "name": "Masha College of Education"
  },
  {
    "name": "Master (Vignan) Degree College"
  },
  {
    "name": "Master Degree College, Kurnool"
  },
  {
    "name": "Master Minds Degree College, Guntur"
  },
  {
    "name": "Masterji Degree College, Hunter Road, Subedari, Hanamkonda"
  },
  {
    "name": "MASTERS DEGREE COLLEGE,  BHAGATH NAGAR, KARIMNAGAR"
  },
  {
    "name": "MASTERS DEGREE COLLEGE,AMANGAL"
  },
  {
    "name": "MATHRU SRI DEGREE COLLEGE FOR WOMEN, HASANPARTHY"
  },
  {
    "name": "MATHRUSRI DEGREE COLLEGE, GANDHI NAGAR ROAD, HUZURABAD"
  },
  {
    "name": "Mathrusri Degree College, Girnibavi (Mandapally) (V)"
  },
  {
    "name": "MATRUSHRI DEGREE COLLEGE, CHOUTUPPAL"
  },
  {
    "name": "Matrusri Degree College,  Asifabad (V&M)"
  },
  {
    "name": "Matrusri Enginering College"
  },
  {
    "name": "Matrusri Institute of P.G. Studies"
  },
  {
    "name": "Matrusri Oriental College, Jillelamudi, Bapatla"
  },
  {
    "name": "MATTREDDY DEGREE COLLEGE"
  },
  {
    "name": "Maulana Azad National Urdu University, Hyderabad"
  },
  {
    "name": "Max Institute of Pharmaceutical Sciences, Velugumatla (V), VV Palem (Po), Khammam"
  },
  {
    "name": "MC MEMORIAL DEGREE COLLEGE, HALIA"
  },
  {
    "name": "MCV Degree College, Tatimakula Palyam Road, Punganur"
  },
  {
    "name": "Medak College of Engineering & Technology"
  },
  {
    "name": "MEDARAMETLA ANJAMMA MASTAN RAO BSC MLT COLLEGE"
  },
  {
    "name": "MEDARAMETLA ANJAMMA MASTAN RAO LAW COLLEGE"
  },
  {
    "name": "MEDARAMETLA ANJAMMA MASTAN RAO PG COLLEGE"
  },
  {
    "name": "MEDARAMETLA ANJAMMA MASTAN RAO PHYSIOTHERAPY COLLEGE"
  },
  {
    "name": "Medarametla Anjamma Mastanrao College of Pharmacy, Narsaraopet"
  },
  {
    "name": "MEDHA DEGREE COLLEGE"
  },
  {
    "name": "MEDHA DEGREE COLLEGE"
  },
  {
    "name": "Medha Degree College, Navipet (V&M), Nizamabad (5018)"
  },
  {
    "name": "Medha Inst. of Nursing & Diagnostic Sceicnes, Hanmakonda"
  },
  {
    "name": "MEDI COLLEGE OF NURSING"
  },
  {
    "name": "Mediciti College of Nursing, Medchal"
  },
  {
    "name": "Mediciti Inst. of Medical Sciences, Ghanapur"
  },
  {
    "name": "Medwin College of Nursing, Hyderabad"
  },
  {
    "name": "Meesala Lakshmayya Arts and Science Degree College"
  },
  {
    "name": "Megana Degree College"
  },
  {
    "name": "MEGHA DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "Megha Institute of Engineering & Technology For Women"
  },
  {
    "name": "Megha Women's Degree College"
  },
  {
    "name": "Meghana Inst. of Dental Sciences, Nizamabad"
  },
  {
    "name": "MES College of Education, Arempula, Khammam"
  },
  {
    "name": "MESCO College of Pharmacy"
  },
  {
    "name": "Mesco Degree College"
  },
  {
    "name": "MESCO Institute of Management & Computer Science"
  },
  {
    "name": "Metas Advintest College of Nursing, Nuzividu"
  },
  {
    "name": "Methodist College of Engineering & Technology"
  },
  {
    "name": "Methodist Degree College"
  },
  {
    "name": "MG College of Education, Kandulapuram, Cumbum"
  },
  {
    "name": "Military College of Electronics and Mechanical Engineering"
  },
  {
    "name": "MILITARYCOLLEGE OF ELECTRONICS AND MECHANICAL ENGINEERING"
  },
  {
    "name": "Millennium College of Education"
  },
  {
    "name": "MIMS College of Nursing, Nellimarla"
  },
  {
    "name": "Mims Degree College, Bodhan, Nizamabad (5074)"
  },
  {
    "name": "Mina Institute of Engineering & Technology for Women"
  },
  {
    "name": "MINAKSHI COLLEGE OF EDUCATION"
  },
  {
    "name": "Minarva Degree College"
  },
  {
    "name": "MINERVA ALLIED HEALTH SCIENCES AND PHYSIOTHERAPY COLLEGE"
  },
  {
    "name": "MINERVA BSC MLT COLLEGE"
  },
  {
    "name": "Miracle Educational Society Group of Institutions, Miracle City, Bhogapuram Mandal PIN-535216, (CC-6C)"
  },
  {
    "name": "Miriam Degree College"
  },
  {
    "name": "MJPTBCWR DEGREE COLLEGE WOMEN MUNIPALLY"
  },
  {
    "name": "MJPTBCWR DEGREE COLLEGE WOMEN VARNI"
  },
  {
    "name": "MJPTBCWR LAW COLLEGE FOR MEN, KANDUKUR, RR DISTRICT"
  },
  {
    "name": "MJPTBCWR LAW COLLEGE FOR WOMEN HANUMAKONDA "
  },
  {
    "name": "MJR COLLEGE OF EDUCAITON, MIRRIGUDA"
  },
  {
    "name": "MJR INSTITUTE OF BUSINESS MANAGEMENT, DIGUVAPOKULAVARIPALLI (V), PULICHERLA (M)"
  },
  {
    "name": "MKR GOVT DEGREE COLLEGE, DEVARAKONDA"
  },
  {
    "name": "ML College of Pharmacy, Singarayakonda"
  },
  {
    "name": "MLR Institute of Pharmacy"
  },
  {
    "name": "MLR Institute of Technology"
  },
  {
    "name": "MNR College of Engineering & Technology"
  },
  {
    "name": "MNR College of Nursing, Sangareddy"
  },
  {
    "name": "MNR College of Pharmacy"
  },
  {
    "name": "MNR College of Teacher Education"
  },
  {
    "name": "MNR Degree College"
  },
  {
    "name": "MNR Dental College and Hospital, Sangareddy"
  },
  {
    "name": "MNR Homoeopathy medical college and hospital"
  },
  {
    "name": "MNR Medical College, Sanagareddy"
  },
  {
    "name": "MNR PG COLLEGE"
  },
  {
    "name": "MNR Teacher Education College"
  },
  {
    "name": "MNR University"
  },
  {
    "name": "Modern College of Education"
  },
  {
    "name": "Modern College of Education, Nagarkurnool"
  },
  {
    "name": "Modern Degree College, Chilakaluripeta"
  },
  {
    "name": "Modern Institute of Physical Medicine & Rehabilitation, Hyderabad"
  },
  {
    "name": "Moghal College of Education"
  },
  {
    "name": "Mohammadiya Institute of Management, Arempula, Khammam"
  },
  {
    "name": "Mohammadiya Institute of Pharmacy, Barugudem, Arempula, Khammam"
  },
  {
    "name": "Mohammed Arhan B.Ed College, Darsi, Prakasam District"
  },
  {
    "name": "MOHAN BABU UNIVERSITY"
  },
  {
    "name": "Mohan Degree College"
  },
  {
    "name": "Mokshitha College of Physical Education, Singarayakonda"
  },
  {
    "name": "Monteesori College of Physiotheraphy, Vijayawada"
  },
  {
    "name": "Moonray Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Morning Star College, Phirangipuram"
  },
  {
    "name": "MOTER CARE COLLEGE OF NURSING, MARKAPUR, PRAKASAM DISTRICT"
  },
  {
    "name": "Mother College of Education"
  },
  {
    "name": "MOTHER COLLEGE OF EDUCATION"
  },
  {
    "name": "Mother College of Education (B.Ed) Darsi, Prakasam District"
  },
  {
    "name": "Mother College of Nursing, Visakhapatnam"
  },
  {
    "name": "Mother Degree College"
  },
  {
    "name": "Mother Krishnabhai College of Nursing, Hyderabad"
  },
  {
    "name": "MOTHER TERESA COLLEGE OF EDUCAITON, ANANTARAM"
  },
  {
    "name": "Mother Teresa College of Management & Computer Applications"
  },
  {
    "name": "Mother Teresa College of Pharmacy"
  },
  {
    "name": "Mother Teresa Institute of Science & Technology"
  },
  {
    "name": "Mother Teresa P.G. College (MCA)"
  },
  {
    "name": "MOTHER TERESA PHARMACY COLLEGE"
  },
  {
    "name": "Mother Theresa College of B.Sc Nursing, Hyderabad"
  },
  {
    "name": "MOTHER THERESA COLLEGE OF BED"
  },
  {
    "name": "Mother Theresa College of Education Mahabubabad"
  },
  {
    "name": "Mother Theresa College of Education, Paloncha"
  },
  {
    "name": "Mother Theresa College of Education, Sathupally"
  },
  {
    "name": "Mother Theresa College of Education, Yemmiganur"
  },
  {
    "name": "Mother Theresa College of Engineering & Technology"
  },
  {
    "name": "MOTHER THERESA DEGREE COLLEGE"
  },
  {
    "name": "Mother Theresa Degree College, # 19-4-15/1, Gollagatta Road, Bhadrachalam"
  },
  {
    "name": "Mother Theresa Degree College, Palamaner Rural"
  },
  {
    "name": "Mother Theresa Institute of Computer Applns, Palamaneru"
  },
  {
    "name": "Mother Theresa Institute of Engineering & Technology,  Palamaner"
  },
  {
    "name": "Mother Theresa Institute of Management, Palamaner"
  },
  {
    "name": "MOTHER THERESA INSTITUTE OF PHARMACEUTICAL EDUCATION AND RESEARCH"
  },
  {
    "name": "Mother Vaanini College of Nursing, Tadepalligudem"
  },
  {
    "name": "Moulana Azad College of Nursing, Kurnool"
  },
  {
    "name": "MPR LAW COLLEGE"
  },
  {
    "name": "MRK COLLEGE OF EDUCATION"
  },
  {
    "name": "MRM College of Pharamacy"
  },
  {
    "name": "MRR COLLEGE OF MCA"
  },
  {
    "name": "MRR MEMORIAL DEGREE COLLEGE, KODAD"
  },
  {
    "name": "Mrs. A.V.N.  College"
  },
  {
    "name": "MSN Degree & PG College"
  },
  {
    "name": "MSR Degree College, Kavali"
  },
  {
    "name": "MSR Degree College, Vinjamur"
  },
  {
    "name": "MSR National Degree College"
  },
  {
    "name": "MSRR COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Muduganti Suryamma College of Education Rajampet, Asifabad"
  },
  {
    "name": "Muffakham Jah College of Engineering & Technology"
  },
  {
    "name": "Mumtaz College of Engineering & Technology"
  },
  {
    "name": "Mumtaz Degree College"
  },
  {
    "name": "Munivenkata Subba  Reddy College of Education, Tirupati"
  },
  {
    "name": "Musheerabad Degree College for Women"
  },
  {
    "name": "MVR College of Engineering & Technology, Beside Hanuman Statue on NH-9, Paritala,  Vijayawada Rural,  PIN-521180(CC-8H)"
  },
  {
    "name": "MVR Degree College, H.No: 6-1, Sai Nagar, Gangavaram,  Chittoor Dist.Rural"
  },
  {
    "name": "MVSR Engineering College"
  },
  {
    "name": "N B K R INSTITUTE OF SCIENCE & TECHNOLOGY, VIDYANAGAR, KOTA"
  },
  {
    "name": "N S COLLEGE OF HORTICULTURE SCIENCE"
  },
  {
    "name": "N S Raju Institute of Engineering & Technology, Visakhapatnam"
  },
  {
    "name": "N. T.R. Govt. Degree & P.G College for (W), Mahabubnagar"
  },
  {
    "name": "N.B. Science Degree College"
  },
  {
    "name": "N.B.K.R Science & Arts College, Vidyanagar"
  },
  {
    "name": "N.B.M. Law College"
  },
  {
    "name": "N.B.R. Degree College, Shastri Nagar, Nirmal"
  },
  {
    "name": "N.N.S Vidya Degree College, Chirala"
  },
  {
    "name": "N.R.K & K.S.R Gupta College of Pharmacy, Tenali"
  },
  {
    "name": "N.R.K. & K.S.R. Gupta Degree College, Tenali"
  },
  {
    "name": "N.S.Agricultural college, Markapur"
  },
  {
    "name": "N.S.P.R. Government Degree College for Women, Hindupur"
  },
  {
    "name": "N.T.R Memorial Degree College, Addanki"
  },
  {
    "name": "N.V.P. Law College"
  },
  {
    "name": "Nadimpalli Satyanarayana Raju Institute of Technology"
  },
  {
    "name": "NAGARJUNA COLLEGE OF EDUCAITON, MIRYALAGUDA"
  },
  {
    "name": "Nagarjuna College of Education"
  },
  {
    "name": "Nagarjuna College of Nursing, Kanuru"
  },
  {
    "name": "Nagarjuna Degree College (Mutrajpally)"
  },
  {
    "name": "Nagarjuna Degree College for Women"
  },
  {
    "name": "NAGARJUNA GOVT. COLLEGE, NALGONDA"
  },
  {
    "name": "Nagarjuna Institute of Management Studies, Chekurapadu"
  },
  {
    "name": "NAGARJUNA PG COLLEGE(MCA), MIRYALAGUDA"
  },
  {
    "name": "Naidu Degree College"
  },
  {
    "name": "Naipunya Degree College"
  },
  {
    "name": "NALANDA COLLEGE OF ARTS & COMMERCE, CHOUTUPPAL"
  },
  {
    "name": "Nalanda College of Education, Kantipudi, Sattenapalli"
  },
  {
    "name": "Nalanda College of Education, Mahabubnagar"
  },
  {
    "name": "Nalanda College of Education, Yemmiganur"
  },
  {
    "name": "NALANDA COLLEGE OF PHARMACY, CHARLAPALLY"
  },
  {
    "name": "Nalanda Degree College"
  },
  {
    "name": "NALANDA DEGREE COLLEGE"
  },
  {
    "name": "Nalanda Degree College"
  },
  {
    "name": "NALANDA DEGREE COLLEGE"
  },
  {
    "name": "NALANDA DEGREE COLLEGE , KARIMNAGAR ROAD, JAGTIAL"
  },
  {
    "name": "NALANDA DEGREE COLLEGE AND PG CENTRE"
  },
  {
    "name": "Nalanda Degree College for Women, Nizamabad (5017)"
  },
  {
    "name": "Nalanda Degree College Hanumapuram Yemmiganur"
  },
  {
    "name": "Nalanda Degree College, # 13-306/12, Near IB, Mancherial (Sri Harsha)"
  },
  {
    "name": "Nalanda Degree College, Anantapur"
  },
  {
    "name": "Nalanda Degree College, Bheemghal (5019)"
  },
  {
    "name": "Nalanda Degree College, H.No. 2-2-22/A/1,Near RTC Bus stand, Mahabubabad"
  },
  {
    "name": "Nalanda Degree College, Mavla Road, Adilabad  504 001"
  },
  {
    "name": "NALANDA DEGREE COLLEGE, MIRYALAGUDA"
  },
  {
    "name": "NALANDA DEGREE COLLEGE, NALGONDA"
  },
  {
    "name": "Nalanda Degree College, Yellareddy (5076)"
  },
  {
    "name": "Nalanda institute of Pharmaceutical Sciences, Siddharth Nagar, Kantepudi(V), Sattenapalli (M),PIN-522 438.(CC-CR)"
  },
  {
    "name": "Nalanda Intitute of P.G Studies, Siddharth Nagar,  Kantipudi (V), Sattenapalli,PIN- 522438(CC-2R)"
  },
  {
    "name": "NALGONDA DEGREE COLLEGE, NALGONDA"
  },
  {
    "name": "Nalla Malla Reddy Engineering College"
  },
  {
    "name": "Nalla Narasimha Reddy Education Society Group of Institutions"
  },
  {
    "name": "Nalla Reddy College of Nursing, Hyderabad"
  },
  {
    "name": "Nannapaneni Venkat Rao (NVR) College of Engineering & Technology, NVR Nagar, Ithanagar, Tenali, PIN-522501(CC-7T)"
  },
  {
    "name": "Narasaraopeta Engineering College"
  },
  {
    "name": "Narasaraopeta Institute of Pharmaceutical Sciences, Kotappakonda Road, Yellamanda (P.O), Narasaraopet (Md)  PIN- 522 601,(CC-CD)"
  },
  {
    "name": "Narasaraopeta Institute of Technology, Kotappakonda Road, Yellamanda(P.O), Narasaraopet, PIN-522601  (CC-KH)"
  },
  {
    "name": "Narayana B.P.Ed. College, Tadipatri"
  },
  {
    "name": "NARAYANA COLLEGE OF ALLIED HEALTH SCIENCES"
  },
  {
    "name": "NARAYANA COLLEGE OF BSC MLT "
  },
  {
    "name": "NARAYANA COLLEGE OF EDUCATION"
  },
  {
    "name": "NARAYANA COLLEGE OF NURSING "
  },
  {
    "name": "Narayana College of Nursing, Nellore"
  },
  {
    "name": "Narayana College of Physiotheraphy, Nellore"
  },
  {
    "name": "NARAYANA DEGREE COLLEGE"
  },
  {
    "name": "Narayana Degree College, KOHEDA"
  },
  {
    "name": "NARAYANA DEGREE COLLEGE, PASUMAMULA"
  },
  {
    "name": "Narayana Dental College & Hospital, Nellore"
  },
  {
    "name": "Narayana Engineering College"
  },
  {
    "name": "Narayana Engineering College-Gudur"
  },
  {
    "name": "Narayana Institute of Management, Tadipatri"
  },
  {
    "name": "Narayana Medical College, Nellore"
  },
  {
    "name": "NARAYANA MEMORIAL DEGREE COLLEGE"
  },
  {
    "name": "Narayana Pharmacy College, Chinthareddypalem"
  },
  {
    "name": "Narayanadri Insitute of Science & Technology, Rajampet"
  },
  {
    "name": "NARENDRA DEGREE COLLEGE,  CHOULAMADDI (V), METPALLY"
  },
  {
    "name": "Narendra Degree College, Armoor (5020)"
  },
  {
    "name": "Narendra Degree College, Sirikonda, Nizamabad (5058)"
  },
  {
    "name": "Narendra Womens Degree College, Armoor (5021)"
  },
  {
    "name": "Narsimha Reddy Engineering College"
  },
  {
    "name": "National Academy of Legal Studies & Research (NALSR) University Hyderabad"
  },
  {
    "name": "National College of Education"
  },
  {
    "name": "NATIONAL COLLEGE OF NURSING, KAKINADA"
  },
  {
    "name": "National Degree College"
  },
  {
    "name": "National Degree College, Bollorugudem, Paloncha"
  },
  {
    "name": "National Geophysical Research Institute"
  },
  {
    "name": "National Institute for the Mentally Handicapped"
  },
  {
    "name": "NATIONAL INSTITUTE OF DESIGN ANDHRA PRADESH"
  },
  {
    "name": "NATIONAL INSTITUTE OF FASHION TECHNOLOGY, HYDERABAD"
  },
  {
    "name": "NATIONAL INSTITUTE OF PHARMACEUTICAL EDUCATION AND RESEARCH (NIPER) HYDERABAD"
  },
  {
    "name": "NATIONAL INSTITUTE OF TECHNOLOGY, ANDHRA PRADESH"
  },
  {
    "name": "National Institute of Technology, Warangal"
  },
  {
    "name": "National Sanskrit University , Tirupati"
  },
  {
    "name": "Nava Bharath Degree College, Nethaji Road, Sathupally"
  },
  {
    "name": "Nava Bharathi College of Education"
  },
  {
    "name": "Nava Chaitanya Degree and PG College"
  },
  {
    "name": "Nava Jeevan College of Medical Lab Technology, Kadapa"
  },
  {
    "name": "NAVABHARATH B.Ed COLLEGE"
  },
  {
    "name": "Navabharathi College of Education, Pebbair"
  },
  {
    "name": "Navabharathi College of P.G Studies"
  },
  {
    "name": "Naveena Degree College, Nehru Nagar, Khammam (Gowtham)"
  },
  {
    "name": "NAVODAYA COLLEGE OF NURSING"
  },
  {
    "name": "Navodaya College of Nursing, Mahabubnagar"
  },
  {
    "name": "Navodaya College of Physiotherapy, Mahabubnagar"
  },
  {
    "name": "NAVODAYA DEGREE COLLEGE, DHARMAPURI"
  },
  {
    "name": "Navodaya Degree for women, Gadwal"
  },
  {
    "name": "Navya Chaitanya College of Education, Vinukonda"
  },
  {
    "name": "Nawab Shah Alam Khan College of Engineering & Technology"
  },
  {
    "name": "Nawabshahala Khan College of Education"
  },
  {
    "name": "NEELAGIRI DEGREE & PG COLLEGE, NALGONDA"
  },
  {
    "name": "Neelam Sanjeeva Reddy College of Education"
  },
  {
    "name": "NEELAM SANJEEVA REDDY MEMORIAL DEGREE COLLEGE"
  },
  {
    "name": "Nehru Memorial Govt. Degree College"
  },
  {
    "name": "NEIL GOGTE INSTITUTE OF TECHNOLOGY"
  },
  {
    "name": "Nekkanti Ramarao Horticultural Polytechnic"
  },
  {
    "name": "Netaji Degree College, Vinjamur"
  },
  {
    "name": "Netaji Institute of Engineering & Technology"
  },
  {
    "name": "Netaji School of  Management "
  },
  {
    "name": "Nethaji Degree College, Cherial (V&M)"
  },
  {
    "name": "Nethaji Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Nethaji Institute of Pharmaceutical Sciences, Somidi, Kazipet, Warangal"
  },
  {
    "name": "Netra vidhyalayam Degree College for Blind"
  },
  {
    "name": "New Adarsh Degree College"
  },
  {
    "name": "NEW ARABINDO DEGREE COLLEGE, NEREDCHERLA"
  },
  {
    "name": "New Era College of Education, Agathavarappadu"
  },
  {
    "name": "NEW GENERATION DEGREE COLLEGE FOR WOMEN, KHAMMAM"
  },
  {
    "name": "New Generation's Degree College"
  },
  {
    "name": "New Government Degree College for Women"
  },
  {
    "name": "NEW GOVTERNMENT DEGREE COLLEGE, SERILINGAMPALLY"
  },
  {
    "name": "NEW MADINA DEGREE COLLEGE FOR WOMEN (CHARMINAR)"
  },
  {
    "name": "NEW MODERN DEGREE COLLEGE"
  },
  {
    "name": "NEW PAGE DEGREE COLLEGE, HAYATHNAGAR"
  },
  {
    "name": "NEW PRAGATHI DEGREE COLLEGE OF COMMERCE & SCIENCE"
  },
  {
    "name": "New Science Degree & PG College, Hunter Road, Hanamkonda,  Warangal"
  },
  {
    "name": "New Science Degree College"
  },
  {
    "name": "New Science Degree College, Hunter Road, Hanamkonda"
  },
  {
    "name": "NEW SIDDHARTHA DEGREE COLLEGE"
  },
  {
    "name": "New Sri Medha Degree College"
  },
  {
    "name": "NEWS Degree College"
  },
  {
    "name": "Newton's Institute of Engineering, Aluguraja Pally(V)"
  },
  {
    "name": "Newtons Institute of Science & Technology, Alugurajupalli Village, Koppunur Post, Macherla Mandal,PIN-522426(CC-9H)"
  },
  {
    "name": "NICMAR University of Construction Studies, Hyderabad Telangana"
  },
  {
    "name": "Nigama College of Physical Education"
  },
  {
    "name": "Nigama Engineering College"
  },
  {
    "name": "Nightingale College Of Nursing"
  },
  {
    "name": "NIGHTINGALE COLLEGE OF NURSING SABBAVARAM"
  },
  {
    "name": "Nimra College of Engineering & Technology, Nimra nagar,(V), Ibrahimpatnam,  PIN-521456,(CC-23)"
  },
  {
    "name": "NIMRA COLLEGE OF NURSING"
  },
  {
    "name": "Nimra College of Pharmacy, Ibrahimpatnam, Vijayawada, PIN-521456(CC-9A)"
  },
  {
    "name": "NIMRA INSTITUTE OF DENTAL SCIENCES"
  },
  {
    "name": "NIMRA INSTITUTE OF MEDICAL SCIENCES (NIMS)"
  },
  {
    "name": "Nirmal Hriday Degree College, # 4-55, Opp. Railway Station, Singareni (V&M)"
  },
  {
    "name": "Nirmala College of Education"
  },
  {
    "name": "Nirmala College of Nursing, Anantapur"
  },
  {
    "name": "Nirmala College of Pharmacy"
  },
  {
    "name": "Nirmala College of Pharmacy, Mangalagiri"
  },
  {
    "name": "Nishitha Commerce & Science College, Nizamabad (5003)"
  },
  {
    "name": "Nishitha Degree College (MBA&MCA), Nizamabad (5174)"
  },
  {
    "name": "Nishitha Degree College, Nizamabad (5022)"
  },
  {
    "name": "Niveditha Degree College, Kothakota"
  },
  {
    "name": "Nizam College, Basheerbagh"
  },
  {
    "name": "Nizam Institute of Medical Sciences,  Hyderabad"
  },
  {
    "name": "Nizam Institute of Pharmacy"
  },
  {
    "name": "NIZAM SCHOOL OF EDUCATION"
  },
  {
    "name": "NJW COLLEGE OF MEDICAL LAB TECHNOLOGY, KETHANAKONDA, IBRAHIMPATNAM"
  },
  {
    "name": "NMES College of Education"
  },
  {
    "name": "Nobel College of Engineering & Technology for Women"
  },
  {
    "name": "NOBLE COLLEGE"
  },
  {
    "name": "Noble College of Education"
  },
  {
    "name": "Noble Degree College"
  },
  {
    "name": "Noble Institute of Science & Tech"
  },
  {
    "name": "Noble P.G College (MBA/MCA)"
  },
  {
    "name": "Noor College of Education, Shadnagar"
  },
  {
    "name": "Nooria Arabia College"
  },
  {
    "name": "Nova College of Education"
  },
  {
    "name": "Nova College of Engineering & Technology, Vegavaram, Jangareddigudem Mandal,PIN- 534447(CC-A0)"
  },
  {
    "name": "Nova College of Engineering And Technology"
  },
  {
    "name": "Nova College of Pharmacetical Education & Research"
  },
  {
    "name": "Nova College of Pharmacy, Vegaram, Jangareddigudem (Mandal), PIN-534447.(CC-T7)"
  },
  {
    "name": "NOVA DEGREE COLLEGE"
  },
  {
    "name": "NOVA PG (MCA)"
  },
  {
    "name": "NOVA PG COLLEGE(MBA)"
  },
  {
    "name": "NRI College of Medical Lab Technology, Chinakakani"
  },
  {
    "name": "NRI College of Nursing, Chinakakani"
  },
  {
    "name": "NRI College of Pharmacy, Pothavarappadu (V), Via Nunna Agiripalli (M), PIN-521212(CC-9E)"
  },
  {
    "name": "NRI COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "NRI Institute of Medical Sciences, Sangivalasa"
  },
  {
    "name": "NRI Institute of Technology, Pothavarappadu (V),  Agiripalli (M), Vijayawada Rural, PIN-821212(CC-KN)"
  },
  {
    "name": "NRI Institute of Technology, Visadala Road, Medikonda Mandal, Perecherla,PIN-522 009(CC-KP)"
  },
  {
    "name": "NRI MEDICAL COLLEGE"
  },
  {
    "name": "NRUPATUNGA INSTITUTE OF TECHNOLOGY AND MANAGEMENT    "
  },
  {
    "name": "Nruputunga Degree College"
  },
  {
    "name": "NS LAW COLLEGE"
  },
  {
    "name": "NSV DEGREE COLLEGE NEAR OLD BUS STAND, JAGTIAL"
  },
  {
    "name": "NSV WOMENS DEGREE COLLEGE"
  },
  {
    "name": "NTR College of Veterinary Science, Gannavaram"
  },
  {
    "name": "NTR Govt.     Degree College,     Valmikipuram   Rural"
  },
  {
    "name": "OBS DEGREE COLLEGE "
  },
  {
    "name": "OGA & Exhibhition Society College of Education"
  },
  {
    "name": "Omega College of Education, Pamuru"
  },
  {
    "name": "Omega College of Pharmacy"
  },
  {
    "name": "Omega Degree College"
  },
  {
    "name": "Omega Degree College (Habsiguda)"
  },
  {
    "name": "OMEGA DEGREE COLLEGE, UPPAL"
  },
  {
    "name": "OMEGA INSTITUTE OF SCIENCE AND TECHNOLOGY"
  },
  {
    "name": "Omega P.G. College - MCA,"
  },
  {
    "name": "OMSAI COM BED COLLEGE"
  },
  {
    "name": "OMSAI COM DEGREE COLLEGE"
  },
  {
    "name": "ONGOLE COLLEGE OF NURSING"
  },
  {
    "name": "Oriental Urdu College"
  },
  {
    "name": "OSM Degree College"
  },
  {
    "name": "Osmania College (men)"
  },
  {
    "name": "Osmania College of Education, Kurnool"
  },
  {
    "name": "Osmania Medical College, Hyderabad"
  },
  {
    "name": "Osmania University, Hyderabad"
  },
  {
    "name": "OUPG COLLEGE NARSAPUR"
  },
  {
    "name": "Owaisi College of Nursing, Hyderabad"
  },
  {
    "name": "Oxford Degree College"
  },
  {
    "name": "OXFORD DEGREE COLLEGE"
  },
  {
    "name": "Oxford Degree College 5-662 Santa Maidanam Srikalahasti Chittoor Dist-Urban"
  },
  {
    "name": "P S K COLLEGE OF NURSING"
  },
  {
    "name": "P S R LAW COLLEGE"
  },
  {
    "name": "P.B.N. College"
  },
  {
    "name": "P.G. College of Law, Basheerbagh"
  },
  {
    "name": "P.G. College, Jogipet"
  },
  {
    "name": "P.G. College, Mirzapur"
  },
  {
    "name": "P.G. College, Secunderabad"
  },
  {
    "name": "P.G. College, Siddipet"
  },
  {
    "name": "P.G. College, Vikarabad"
  },
  {
    "name": "P.M.N.Degree College"
  },
  {
    "name": "P.N.C & K.R. College, Narasaraopeta"
  },
  {
    "name": "P.N.C. & K.R College of Nursing, Guntur"
  },
  {
    "name": "P.N.C.A Degree College, Somarajupalli, Singarayakonda"
  },
  {
    "name": "P.R.P.M. DEGREE COLLEGE"
  },
  {
    "name": "P.Rami Reddy Memorial College of Pharmacy"
  },
  {
    "name": "P.S. Government Degree College, Penukonda"
  },
  {
    "name": "P.S.B. College of Education, Chirala"
  },
  {
    "name": "P.S.N. Murthy Degree College"
  },
  {
    "name": "P.S.S.R College of Arts & Science"
  },
  {
    "name": "P.V Ramreddy P.G College"
  },
  {
    "name": "P.V. NARSIMHA RAO TELANGANA VETERINARY UNIVERSITY"
  },
  {
    "name": "P.V.K.K. Degree College, Anantapur"
  },
  {
    "name": "P.V.R.Trust Degree College"
  },
  {
    "name": "PACE Institution of Technology & Sciences, NH-5, Near Valluramma Temple, Vallur, Ongole,-523272(CC-KQ)"
  },
  {
    "name": "PADALA DEGREE COLLEGE, THURKAPALLY"
  },
  {
    "name": "Padala Rama Reddy Law College"
  },
  {
    "name": "Padishala Veerabhadraiah Memorial Degree College For Women Warangal"
  },
  {
    "name": "Padma Chandra College of Nursing, Kurnool"
  },
  {
    "name": "PADMANAYAKA COLLEGE OF SPECIAL EDUCATION"
  },
  {
    "name": "PADMANAYAKA COLLEGE OF SPECIAL EDUCATION"
  },
  {
    "name": "Padmavatamma College of Nursing, Tirupati"
  },
  {
    "name": "PADMAVATHI COLLEGE OF TEACHER EDUCATION"
  },
  {
    "name": "PADMAVATHI DEGREE COLLEGE"
  },
  {
    "name": "PADMAVATHI DEGREE COLLEGE"
  },
  {
    "name": "Padmavathi Degree College for Women, Kothawada, Warangal"
  },
  {
    "name": "PADMAVATHI DEGREE COLLEGE, BAZARHATHNOOR"
  },
  {
    "name": "PADMAVATHI DEGREE COLLEGE, SARANGAPUR"
  },
  {
    "name": "Paladugu Parvathi Devi College of Engineering and Technology, Surampalli(v), Gannavaram(M), PIN-520001(CC-KR)."
  },
  {
    "name": "Palakondraya Degree College"
  },
  {
    "name": "Palamuru University PG Centre Kollapur"
  },
  {
    "name": "Palamuru University,  Mahabubnagar"
  },
  {
    "name": "PALIVELA PG COLLEGE"
  },
  {
    "name": "Pallavi College of Education"
  },
  {
    "name": "Pallavi College of Teacher Education"
  },
  {
    "name": "Pallavi Degree College"
  },
  {
    "name": "Pallavi Engineering College"
  },
  {
    "name": "Palnadu College of Education, Narayanapuram"
  },
  {
    "name": "Panchsheel College of Education, Nirmal"
  },
  {
    "name": "Pandit Narendra Oriental College"
  },
  {
    "name": "PANDIT SUBBAREDDY COLLEGE , KONDAMODU"
  },
  {
    "name": "Panineeya Mahavidyala College of Education"
  },
  {
    "name": "Panineeya Mahavidyala Institute of Dental Sciences and Research Center, Hyderabad"
  },
  {
    "name": "Pannala ram reddy college of business managememt"
  },
  {
    "name": "Parvatha Reddy Babul Reddy Visvodaya Institute of Technology & Science"
  },
  {
    "name": "Parvathaneni Brahmayya Siddhartha College Of Arts & Science"
  },
  {
    "name": "Pasha College of Education"
  },
  {
    "name": "Pasha Noble Degree & P.G College (New Noble Degree College)"
  },
  {
    "name": "Pathfinder Institute of Pharmacy Education & Research, Near Warangal Airport, Warangal"
  },
  {
    "name": "PATTABHI DEGREE COLLEGE"
  },
  {
    "name": "PAVITRA DEGREE COLLEGE"
  },
  {
    "name": "PAVLOV COLLEGE OF TEACHER EDUCATION"
  },
  {
    "name": "PBDEVI COLLEGE OF EDUCATION "
  },
  {
    "name": "PDS Institute of Physiotherapy, Hyderabad"
  },
  {
    "name": "Pedanandipadu College of Arts and Sciences, Pedanandipadu"
  },
  {
    "name": "Pendekanti Institute of Management"
  },
  {
    "name": "Pendekanti Law College"
  },
  {
    "name": "Penna College of Cement Sciences"
  },
  {
    "name": "Peoples College of Arts, Science & Commerce"
  },
  {
    "name": "PES College of Nursing, Kuppam"
  },
  {
    "name": "PES COLLEGE OF PHYSIOTHERAPY "
  },
  {
    "name": "PES Inst. of Paramedical Sciences, College of B.Sc MLT, Kuppam"
  },
  {
    "name": "PES INSTITUTE OF MEDICAL SCIENCES AND RESEARCH"
  },
  {
    "name": "PG CENTRE GADWAL PALAMURU UNIVERSITY"
  },
  {
    "name": "PG CENTRE, WANAPARTHY, PALAMURU UNIVERSITY"
  },
  {
    "name": "PIER GIORGIO FRASSATI College of Nursing, Suryapet"
  },
  {
    "name": "PIMTECH College of B.Sc MLT, Khammam"
  },
  {
    "name": "Pingle Government College for Women, (Autonomous), Waddepally, Hanumakonda District,"
  },
  {
    "name": "Pinnacle College of Culinary Arts and Hotel Management"
  },
  {
    "name": "Pinnacle Degree College"
  },
  {
    "name": "Pinnacle Institute of Hotel Management"
  },
  {
    "name": "Pioneer College of Nursing, Hyderabad"
  },
  {
    "name": "Pioneer Degree College"
  },
  {
    "name": "Pioneer Institute of Hotel Management"
  },
  {
    "name": "Pithapur Rajah's Government College (Autonomous)"
  },
  {
    "name": "PJR'S Memorial Sai Teja Degree College"
  },
  {
    "name": "PJR'S Spoorthy Degree College, Kamareddy (5048)"
  },
  {
    "name": "PJRS SAHITHI DEGREE COLLEGE DEVARAKONDA"
  },
  {
    "name": "PMR Degree College"
  },
  {
    "name": "PNCA B.Ed College, Singarayakonda, Prakasam District."
  },
  {
    "name": "POLYTECHNIC OF AGRICULTURAL ENGINEERING, RARS, ANAKAPALLE"
  },
  {
    "name": "POLYTECHNIC OF AGRICULTURE, GARIKAPADU"
  },
  {
    "name": "POLYTECHNIC OF AGRICULTURE, MARUTERU"
  },
  {
    "name": "POLYTECHNIC OF AGRICULTURE, REDDIPALLI, ANANTAPURAM"
  },
  {
    "name": "POLYTECHNIC OF AGRICULTURE,RAMAGIRI"
  },
  {
    "name": "POLYTECHNIC OF ORGANIC FARMING, CHINTAPALLE"
  },
  {
    "name": "Ponugoti Madhav Rao Law College"
  },
  {
    "name": "Ponugoti Madhava Rao Degree College"
  },
  {
    "name": "Poojya Sri Madhavananji College of Education"
  },
  {
    "name": "POOJYASRI MADHAVANJI DEGREE COLLEGE, SAROORNAGAR"
  },
  {
    "name": "Poorna Sai Vivekananda Degree College"
  },
  {
    "name": "Potti Sri Ramulu Telugu University, Hyderabad"
  },
  {
    "name": "POTTI SRIRAMULU CHALAVADI MALLIKARJUNA RAO COLLEGE OF ENGINEERING AND TECHNOLOGY"
  },
  {
    "name": "PPRS Kaumudi Degree College, Balaga"
  },
  {
    "name": "Prabha Degree College"
  },
  {
    "name": "Prabhala Lakshminarayana Memorial Degree College, Kaza"
  },
  {
    "name": "PRABHAS COLLEGE OF EDUATION"
  },
  {
    "name": "PRABHAS DEGREE COLLEGE"
  },
  {
    "name": "Prabhat Institute of Pharmacy, Kurnool"
  },
  {
    "name": "Prabhath College of Education, Nandyal"
  },
  {
    "name": "PRABHATH INSTITUTE OF COMPUTER SCIENCES, PARNAPALLI (V), NANDYAL"
  },
  {
    "name": "PRABHU COLLEGE OF NURSING"
  },
  {
    "name": "Pragathi  Degree College"
  },
  {
    "name": "Pragathi  Degree College "
  },
  {
    "name": "Pragathi Arts & Science Degree & P.G College, Achampet"
  },
  {
    "name": "PRAGATHI ARTS&SCIENCE DEGREE COLLEGE, TIRUMALGIRI"
  },
  {
    "name": "PRAGATHI COLLEGE OF EDUCATION"
  },
  {
    "name": "PRAGATHI COLLEGE OF EDUCATION"
  },
  {
    "name": "Pragathi College of Education, Banswada (5291)"
  },
  {
    "name": " PRAGATHI COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "Pragathi College of Physiotherapy, Nizamabad"
  },
  {
    "name": "Pragathi Degree College (Co-Ed.)"
  },
  {
    "name": "Pragathi Degree College for Women"
  },
  {
    "name": "Pragathi Degree College Tanuku"
  },
  {
    "name": "PRAGATHI DEGREE COLLEGE, CHOUTUPPAL"
  },
  {
    "name": "PRAGATHI DEGREE COLLEGE, GOPALRAO PET, RAMADUGU"
  },
  {
    "name": "PRAGATHI DEGREE COLLEGE, KALVACHERLA, KAMANPUR"
  },
  {
    "name": "Pragathi Degree College, Kottavalasa, Vizianagaram"
  },
  {
    "name": "Pragathi Degree College, Nizamabad (5023)"
  },
  {
    "name": "Pragathi Degree College, Ravi Nagar Kota"
  },
  {
    "name": "PRAGATHI DEGREE COLLEGE, VALIGONDA"
  },
  {
    "name": "Pragathi Mahavidyalaya Degree College"
  },
  {
    "name": "Pragathi Women's Degree College"
  },
  {
    "name": "PRAGATHI WOMEN'S DEGREE COLLEGE, CHANDA NAGAR"
  },
  {
    "name": "Pragati College of Education"
  },
  {
    "name": "Pragati College of Education"
  },
  {
    "name": "Pragati Degree College Sattenapalli"
  },
  {
    "name": "Pragati Degree College, Kakinada, E.G.Dist."
  },
  {
    "name": "Pragati Engineering College"
  },
  {
    "name": "Pragati Womens Degree College"
  },
  {
    "name": "Pragna College of Education"
  },
  {
    "name": "PRAGNA DEGREE COLLEGE-093"
  },
  {
    "name": "Pragnya Degree College"
  },
  {
    "name": "Pragnya Womens Degree College "
  },
  {
    "name": "Pragyna Degree college"
  },
  {
    "name": "PRAJNA COLLEGE OF SCIENCE & ARTS NEAR G.J. COLLEGE"
  },
  {
    "name": "PRAKASAM DEGREE COLLEGE"
  },
  {
    "name": "Prakasam Engineering College, O.V.Road, Kandukur,PIN- 523105(CC-F9)"
  },
  {
    "name": "PRAKASH DEGREE COLLEGE"
  },
  {
    "name": "PRAMEELAMMA DEGREE COLLEGE (3101), AMANGAL"
  },
  {
    "name": "Pranavi College of Arts and Science, Ijjavaram"
  },
  {
    "name": "Prasad College of Education"
  },
  {
    "name": "PRASAD V POTLURI SIDDHARTHA INSTITUTE OF TECHNOLOGY, Devabhaktuni Ramalingeswara Rao Road, Behind VR Siddhartha Engg. College, Kanuru, Vijayawada, PIN-520007(CC-50)"
  },
  {
    "name": "PRASHANTHI COLLEGE OF NURSING, REDDY COLONY, HANUMAKONDA"
  },
  {
    "name": "Prasuna College of Law, Kurnool"
  },
  {
    "name": "Pratap College of Education, Chirala"
  },
  {
    "name": "Prathap Narender Reddy College of Pharmacy"
  },
  {
    "name": "PRATHIBA COLLEGE OF EDUCATION"
  },
  {
    "name": "PRATHIBA DEGREE COLLEGE FOR WOMEN, KUKATPALLY"
  },
  {
    "name": "PRATHIBA DEGREE COLLEGE, CHERIAL"
  },
  {
    "name": "Prathibha Arts and Science College"
  },
  {
    "name": "Prathibha Degree College"
  },
  {
    "name": "Prathibha Degree College (Ibrahimpatnam)"
  },
  {
    "name": "Prathibha Degree College, Sullurpet"
  },
  {
    "name": "PRATHIBHASOWJANYA DEGREECOLLEGE"
  },
  {
    "name": "Prathima College of Nursing, Karimnagar"
  },
  {
    "name": "Prathima Institute of Medical Sciences, Karimnagar"
  },
  {
    "name": "PRATHIMA RELIEF COLLEGE OF NURSING"
  },
  {
    "name": "PRATHIMA RELIEF INSTITUTE OF HEALTH SCIENCES"
  },
  {
    "name": "PRATHIMA RELIEF INSTITUTE OF MEDICAL SCIENCES"
  },
  {
    "name": "Prathishtha Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Pratibha Degree College"
  },
  {
    "name": "Pratibha Degree College, Kuyyeru(v), Kajukuru(M), E.G.Dist."
  },
  {
    "name": "Pratibha Degree College, New colony, Puritipenta, Gajapatinagaram, Vizianagaram"
  },
  {
    "name": "PRAVEEN COLLEGE OF EDUCATION, BESTAVARIPET"
  },
  {
    "name": "Prema College Of Education"
  },
  {
    "name": "Prema Sagari College of Nursing, Visakhapatnam"
  },
  {
    "name": "Prerana Degree College, Block No. 12, Islampura, Mancherial"
  },
  {
    "name": "Presidency College of Education for Girls"
  },
  {
    "name": "Presidency Degree College"
  },
  {
    "name": "PRESIDENCY DEGREE COLLEGE FOR COMMERCE & SCIENCE"
  },
  {
    "name": "Presidency School of Management & Computer Science"
  },
  {
    "name": "PRINCESS DURRU SHEHVAR COLLEGE OF EDUCATION FOR WOMEN, YAKATPURA"
  },
  {
    "name": "Princess Durru Shehvar College of MLT, Hyderabad"
  },
  {
    "name": "Princess Duru Shehvar College of Nursing, Hyderabad"
  },
  {
    "name": "Princess Shehkar Degree College for Women"
  },
  {
    "name": "Princeton College of Education"
  },
  {
    "name": "Princeton College of Engineering & Technology"
  },
  {
    "name": "Princeton College of Pharmacy"
  },
  {
    "name": "Princeton Degree & P.G College"
  },
  {
    "name": "Princeton Institute of Engineering & Technology For Women"
  },
  {
    "name": "Princeton P.G. College of Information Technology"
  },
  {
    "name": "Princeton P.G. College of Management"
  },
  {
    "name": "PRISM Degree College"
  },
  {
    "name": "PRISM DEGREE COLLEGE "
  },
  {
    "name": "Priya Darisini Degree College, Tenali"
  },
  {
    "name": "PRIYADARSHANI DEGREE COLLEGE, HUZURNAGAR"
  },
  {
    "name": "Priyadarshini College of Business Management"
  },
  {
    "name": "Priyadarshini College of Education, Armoor (5285)"
  },
  {
    "name": "Priyadarshini College of Engineering Technology"
  },
  {
    "name": "Priyadarshini Collge of Computers Science & Research"
  },
  {
    "name": "Priyadarshini Degree College"
  },
  {
    "name": "PRIYADARSHINI DEGREE COLLEGE"
  },
  {
    "name": "Priyadarshini Degree College"
  },
  {
    "name": "Priyadarshini Degree College, Kutir Complex, Opp. Bus Stand, Kothagudem"
  },
  {
    "name": "Priyadarshini Degree College, Nehru Nagar, Khammam"
  },
  {
    "name": "Priyadarshini Institute of Science & Technology for Women, Khammam "
  },
  {
    "name": "PRIYADARSHINI INSTITUTE OF TECHNOLOGY & SCIENCES  CHINTALAPUDI, Near Tenali, Duggirala Mandal, PIN-522306  (CC-X2)"
  },
  {
    "name": "PRIYADARSHINI INSTITUTE OF TECHNOLOGY & SCIENCES FOR WOMEN, CHINTALAPUDI, Near Tenali, PIN-522306.(CC-KU)"
  },
  {
    "name": "PRIYADARSHNI INSTITUTE OF TECHNOLOGY & MANAGEMENT"
  },
  {
    "name": "Priyadarsini College of Nursing, Rajahmundry"
  },
  {
    "name": "Priyadarsini Institute of Pharmaceutical Science"
  },
  {
    "name": "Priyanka Degree College for Women"
  },
  {
    "name": "Prof.G.Sundara Reddy Degree College"
  },
  {
    "name": "PROFESSOR JAYASHANKAR TELANGANA AGRICULTURAL UNIVERSITY (PJTAU)"
  },
  {
    "name": "PRR & VS Govt. College, Vidavalur"
  },
  {
    "name": "PRR College of Commerce & Management"
  },
  {
    "name": "PRR Institute of Management, Gooty"
  },
  {
    "name": "PSC & KVSC Govt. Degree,"
  },
  {
    "name": "Pujitha College of Education, Ravipadu, Narsaraopeta, Guntur District 522603"
  },
  {
    "name": "Pulipati College of Nursing, Konizerla"
  },
  {
    "name": "Pulipati Prasad college of Nursing, Khammam"
  },
  {
    "name": "Pulipati Prasad College of Pharmaceutical Sciences, Khammam"
  },
  {
    "name": "Pulla Reddy Institute of Computer Sciences"
  },
  {
    "name": "Pulla Reddy Institute of Pharmacy"
  },
  {
    "name": "Punyagiri Degree College"
  },
  {
    "name": "Purandeswari College Of Education"
  },
  {
    "name": "Pushpagiri College of Education"
  },
  {
    "name": "PUTTUR COLLEGE OF PHYSIOTHERAPY PUTTUR"
  },
  {
    "name": "PVKK Institute of Technology, Anantapur"
  },
  {
    "name": "PVKN Govt. College (A), CHITTOOR Urban"
  },
  {
    "name": "Pydah College"
  },
  {
    "name": "Pydah College (PG Courses)"
  },
  {
    "name": "Pydah College for Women"
  },
  {
    "name": "Pydah College of Education"
  },
  {
    "name": "Pydah College of Engineering, Yanam Road, Patavala,Tallarevu (M), Kakinada-533461  (CC-6T)"
  },
  {
    "name": "PYDAH COLLEGE OF FISHERIES POLYTECHNIC"
  },
  {
    "name": "PYDAH COLLEGE OF PHARMACY"
  },
  {
    "name": "PYDAH GROUP FISHERIES POLYTECHNIC"
  },
  {
    "name": "QIS College of Engineering & Technology, Vengamukkapalem (Village), Pondur Road, Ongle(M),PIN-523 272.(CC-49)"
  },
  {
    "name": "QIS College of Pharmacy, Vengamukkapalem, Pondur Road,  Ongole-523272  (CC-Y3)"
  },
  {
    "name": "Quba College of Engineering & Technology"
  },
  {
    "name": "QUEEN MARY COLLEGE OF COMMERCE"
  },
  {
    "name": "R C REDDY DEGREE COLLEGE"
  },
  {
    "name": "R K DEGREE COLLEGE"
  },
  {
    "name": "R P R COLLEGE OF PHYSIOTHERAPY ONGOLE PRAKASAM DISTRICT"
  },
  {
    "name": "R R COLLEGE OF BSC MLT ANANTHAPURAM"
  },
  {
    "name": "R R COLLEGE OF PHYSIOTHERAPY BPT, BALLARY BYPASS ROAD, ANANTHAPURAM"
  },
  {
    "name": "R V M INSTITUTE OF MEDICAL SCIENCES AND RESEARCH CENTRE"
  },
  {
    "name": "R.B.V.R.R. Women's College"
  },
  {
    "name": "R.D. Women s Degree College, H.No. 5-10-50/A, Kishanpura, Hanamkonda"
  },
  {
    "name": "R.G Kedia College of Commerce"
  },
  {
    "name": "R.G. Kedia Degree College"
  },
  {
    "name": "R.G.R Siddhanthi College of Business Management"
  },
  {
    "name": "R.K. College of Arts, Commerce and Science,  Kamareddy (5045)"
  },
  {
    "name": "R.K.Degree College"
  },
  {
    "name": "R.R. Christian College of Nursing, Kurnool"
  },
  {
    "name": "R.R.D.S. GOVT. DEGREE COLLEGE"
  },
  {
    "name": "R.V.R. & J.C. College of Engineering"
  },
  {
    "name": "R.V.V.N. College, Dharanikota, Amaravathi"
  },
  {
    "name": "Rabindranath College of Education"
  },
  {
    "name": "RACE WOMENS DEGREE COLLEGE"
  },
  {
    "name": "Rachana College of Journalism"
  },
  {
    "name": "Radha Degree College, Vinukonda"
  },
  {
    "name": "RadheKrishna Women's College"
  },
  {
    "name": "RAGA COLLEGE OF EDUCATION,GOUURIGUDEM, SATHUPALLY"
  },
  {
    "name": "RAGHAVA COLLEGE OF B.SC. MEDICAL LAB TECHNOLOGY"
  },
  {
    "name": "RAGHAVA COLLEGE OF NURSING"
  },
  {
    "name": "RAGHAVA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Raghava Degree College - Ongole"
  },
  {
    "name": "Raghavendra Institute of Arts & Sciences, Krishnamareddy Palli"
  },
  {
    "name": "Raghavendra Institute of Pharmaceutical Education & Research, Anantapur"
  },
  {
    "name": "Raghu College Of Pharmacy"
  },
  {
    "name": "Raghu Engineering College, Dakamarri Village, Bheemunipatnam Mandal,PIN-531162(CC-98)"
  },
  {
    "name": "Rahman s College of Education, Jangaon"
  },
  {
    "name": "Railway Degree College"
  },
  {
    "name": "Rainbow College of Nursing, Hyderabad"
  },
  {
    "name": "Rainbow Degree College, Jukkal, Nizamabad (5067)"
  },
  {
    "name": "Rainbow Integrated Degree College"
  },
  {
    "name": "RAJA RATNA COLLEGE OF NURSING"
  },
  {
    "name": "RAJABOINA VENKATAIAH MEMORIAL BSC MLT COLLEGE"
  },
  {
    "name": "RAJABOINA VENKATAIAH MEMORIAL COLLEGE OF NURSING"
  },
  {
    "name": "Rajah R.S.R.K.Ranga Rao College, Bobbili"
  },
  {
    "name": "Rajamahendri  Degree College for Women"
  },
  {
    "name": "Rajamahendri Institute of Engineering & Technology, Bhoopalapatnam, Near Pidimgoyyi,  Rajahmundry-533103(CC-MD))"
  },
  {
    "name": "Rajeev Gandhi Memorial College of Engineering  & Technology, Nandyal"
  },
  {
    "name": "Rajiv Gandhi Degree College"
  },
  {
    "name": "Rajiv Gandhi Institute of Management & Science, 124, Thimmapuram Village, Panchayat Area, Kakinada, 533005  (CC-8Z)"
  },
  {
    "name": "Rajiv Gandhi Institute of Management & Sciences"
  },
  {
    "name": "Rajiv Gandhi Institute of Medical Sciences, Kadapa"
  },
  {
    "name": "RAJIV GANDHI UNIVERSITY OF KNOWLEDGE TECHNOLOGIES"
  },
  {
    "name": "RAJIV GANDHI UNIVERSITY OF KNOWLEDGE TECHNOLOGIES, BASAR"
  },
  {
    "name": "Rajiv Inst. of Medical Sciences, Ongole"
  },
  {
    "name": "Rajiv Inst. of Medical Sciences, Srikakulam"
  },
  {
    "name": "Rajiv Institute of Medical Sciences,"
  },
  {
    "name": "RAJU COLLEGE OF EDUCATION, RAYACHOTY"
  },
  {
    "name": "RAMA KRISHNA DEGREE & PG COLLEGE VANI NAGAR, JAGTIAL"
  },
  {
    "name": "Rama Krishna Degree & PG College, Kamareddy (5024)"
  },
  {
    "name": "Ramachandra College of Engineering"
  },
  {
    "name": "Ramadevi College of Education"
  },
  {
    "name": "Ramakrishna Arts & Science Degree College, Allur"
  },
  {
    "name": "RAMAKRISHNA DEGREE COLLEGE JHANSI ROAD KORUTLA"
  },
  {
    "name": "RAMAKRISHNA DEGREE COLLEGE, HALIA"
  },
  {
    "name": "Ramalakshmi College of Education"
  },
  {
    "name": "Ramesh B.Ed College, Mangamuru, S.N Padu, Prakasam District"
  },
  {
    "name": "Rami Reddy Subbarami Reddy Engineering College, Kavali"
  },
  {
    "name": "RAMLEELA DEGREE COLLEGE"
  },
  {
    "name": "Rams Degree College, Bhadrachalam (Sampurna, Erragunta)"
  },
  {
    "name": "Rangaraya Medical College, Kakinada"
  },
  {
    "name": "Rangumudri Appalaswamy Naidu Physical Education College"
  },
  {
    "name": "RANGUMUDRI COLLEGE OF EDUCATION"
  },
  {
    "name": "RANGUMUDRI COLLEGE OF SCIENCE AND ARTS"
  },
  {
    "name": "Rangumudri Degree College"
  },
  {
    "name": "Rangumudri M.Ed. College"
  },
  {
    "name": "Rani Tirumala Devi Degree College"
  },
  {
    "name": "Rao's College of Pharmacy,"
  },
  {
    "name": "Rao's Institute of Management Studies"
  },
  {
    "name": "Raos Degree & PG College,Nellore"
  },
  {
    "name": "Raos Degree College"
  },
  {
    "name": "RAOS DEGREE COLLEGE"
  },
  {
    "name": "Raos Degree College, Nellore"
  },
  {
    "name": "Raos Institute of Computer Sciences Chemudugunta, Bujabuja Nellore"
  },
  {
    "name": "RASHMIDHAR TEJA COLLEGE OF EDUCATION, NEAR D40 CANAL, KOUSALYANAGAR, KORATLA"
  },
  {
    "name": "RASHMIDHAR TEJA DEGREE COLLEGE , OPP: BUS STAND, KORATLA"
  },
  {
    "name": "RASS KRISHI VIGYAN KENDRA POLYTECHNIC OF AGRICULTURAL"
  },
  {
    "name": "RATHNAMA COLLEGE OF NURSING"
  },
  {
    "name": "Ratna Degree College, Opp: Petrol Bunk, Madnoor, Nizamabad (5053)"
  },
  {
    "name": "Ratnam Institute of Pharmacy, Pidathapolur"
  },
  {
    "name": "RAVI TEJA COLLEGE OF EDUCATION, BESTAVARIPET"
  },
  {
    "name": "Ravindra Bharathi College of Education, Chirala"
  },
  {
    "name": "Ravindra College of Engineering for Women, kurnool"
  },
  {
    "name": "Ravindra Degree College for Women,"
  },
  {
    "name": "Ravindras Rayalaseema College, Punganur Rural"
  },
  {
    "name": "RAVOOF &  VAZIR KHAN MEMORIAL COLLEGE OF EDUCATION"
  },
  {
    "name": "Rayalaseema College of Education, Tirupati"
  },
  {
    "name": "Rayalaseema College of Graduation Tirupati Urban"
  },
  {
    "name": "Rayalaseema College of Nursing, Kurnool"
  },
  {
    "name": "Rayalaseema College of Physical Education"
  },
  {
    "name": "Rayalaseema Institute of Information & Management Sciences, Tirupati"
  },
  {
    "name": "Rayalaseema, University Kurnool"
  },
  {
    "name": "Rayapati Venkata Ranga Rao College of Education, Guntur"
  },
  {
    "name": "RBVRR COLLEGE OF EDUCATION, KARIMNAGAR"
  },
  {
    "name": "RBVRR Institute of Technology"
  },
  {
    "name": "RBVRR Women's  College of Pharmacy"
  },
  {
    "name": "RCR Institute of Management & Technology, Karakambadi, Tirupati"
  },
  {
    "name": "Reah School of Business Management"
  },
  {
    "name": "REBBANA ARTS AND SCIENCE DEGREE COLLEGE, REBBENA"
  },
  {
    "name": "Regency College of Hotel Management"
  },
  {
    "name": "Repalle Christian College of Education, Repalle"
  },
  {
    "name": "Repalle Christian College of Nursing, Repalle"
  },
  {
    "name": "Repalle Christian College, Repalle"
  },
  {
    "name": "RGR Siddhanthi College of Education"
  },
  {
    "name": "RGR Siddhanthi College of Pharmacy"
  },
  {
    "name": "RGR Siddhanthi Degree College"
  },
  {
    "name": "RGUKT- NUZVID"
  },
  {
    "name": "RGUKT- ONGOLE"
  },
  {
    "name": "RGUKT-RK VALLEY"
  },
  {
    "name": "RGUKT-SRIKAKULAM"
  },
  {
    "name": "RH COLLEGE OF NURSING PORANKI VIJAYAWADA"
  },
  {
    "name": "RICH College of Nursing, Nellore"
  },
  {
    "name": "RISE Krishna Sai Gandhi Group of Institutions, Ongole"
  },
  {
    "name": "RISE Krishna Sai Prakasam Group of Institutions (Integrated Campus), Off NH-5, Valluru, Ongole-523272(CC-8A)"
  },
  {
    "name": "Rishi Degree College"
  },
  {
    "name": "RISHI Degree College"
  },
  {
    "name": "Rishi M.S. Institute of Engineering & Technology for Women"
  },
  {
    "name": "RISHI POLYTECHNIC OF AGRICULTURE "
  },
  {
    "name": "Rishi UBR Womens College"
  },
  {
    "name": "RIYAN COLLEGE OF EDUCATION"
  },
  {
    "name": "RJRM Degree College, Marripeda"
  },
  {
    "name": "RK College of Engineering, Navepothavaram(V),Kethanakonda, Ibrahimpatnam,PIN-521456,(CC-MC)"
  },
  {
    "name": "RKLK COLLEGE OF EDUCAITON, SURYAPET"
  },
  {
    "name": "RKLK DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "RKLK PG College"
  },
  {
    "name": "RKLK PG COLLEGE SURYAPET"
  },
  {
    "name": "RKM Degree College Penumuru(M), Chittoor Dist.   Rural Co-Ed."
  },
  {
    "name": "Roda Mistry College of Social Work & Research Centre"
  },
  {
    "name": "Rohini College of Nursing, Hanumakinda"
  },
  {
    "name": "Rohini Degree College, Chilakaluripet, Guntur District"
  },
  {
    "name": "Roots college of Hotel Management and Culinary Arts "
  },
  {
    "name": "Roots Degree College"
  },
  {
    "name": "ROSHINI DEGREE COLLEGE,  RAGHAVULU NAGAR, NEAR BUS STAND MANTHANI"
  },
  {
    "name": "ROSHINIDEGREECOLLEGE"
  },
  {
    "name": "ROUSSEAU COLLEGE OF TEACHER EDUCATION, VENKATRAOPALLY, NARSINGAPUR (P), BOINPALLI (M), KARIMNAGAR"
  },
  {
    "name": "Rousseau Institute of Management Studies"
  },
  {
    "name": "ROYAL COLLEGE OF EDUCATION"
  },
  {
    "name": "Royal College of Education, Markapur, Prakasam District"
  },
  {
    "name": "Royal College of Nursing, Chollangi"
  },
  {
    "name": "Royal Degree College"
  },
  {
    "name": "Royal Degree College for Women"
  },
  {
    "name": "Royal PG Centre, Rayadurg"
  },
  {
    "name": "Royal School of Information & Management, Agarala Village, Tirupati"
  },
  {
    "name": "RRGR Degree College"
  },
  {
    "name": "RRM DEGREE COLLEGE"
  },
  {
    "name": "RUDRAMADEVI MAHILA DEGREE COLLEGE, KHANAPUR"
  },
  {
    "name": "RUKMINI College of Management & Commerce"
  },
  {
    "name": "Rukminidevi Arundale college of Education, Madanapalle"
  },
  {
    "name": "RUSHI ARTS And SCIENCE DEGREE COLLEGE "
  },
  {
    "name": "RV INSTITUTE OF TECHNOLOGY, Chebrolu, Guntur District-522212 Andhra Pradesh."
  },
  {
    "name": "RVM COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "S K P P Horticultural Polytechnic"
  },
  {
    "name": "S L N DEGREE COLLEGE"
  },
  {
    "name": "S M Y College of Education, Darsi"
  },
  {
    "name": "S R Govt. Arts & Science College, Kothagudem"
  },
  {
    "name": " S R Horticultural polytechnic"
  },
  {
    "name": "S S AND N AH POLYTECHNIC COLLEGE"
  },
  {
    "name": "S S AND N COLLEGE OF NURSING"
  },
  {
    "name": "S S P G Horticultural Polytechnic"
  },
  {
    "name": "S S R DEGREE COLLEGE"
  },
  {
    "name": "S S R DEGREE COLLEGE , MARKAPUR, PRAKASAM DISTRICT"
  },
  {
    "name": "S V COLLEGE OF NURSING"
  },
  {
    "name": "S V College of Special Education Kothuru Vijayawada"
  },
  {
    "name": "S V R DEGREE COLLGE , SATTENAPALLI"
  },
  {
    "name": "S.A.B.R. Govt. Degree College, Repalle"
  },
  {
    "name": "S.A.R. College Of Education"
  },
  {
    "name": "S.A.S. GOVT. DEGREE COLLEGE"
  },
  {
    "name": "S.B.G. Degree College, Sattenapalli"
  },
  {
    "name": "S.B.S.Y.M.  DEGREE COLLEGE, PALASA"
  },
  {
    "name": "S.B.V.S.R College of Education, Cheemakurthi"
  },
  {
    "name": "S.C.I.M Govt. College"
  },
  {
    "name": "S.Chaavan Institute of Computer Applications, Muthukur"
  },
  {
    "name": "S.D Signodia College of Arts, Commerce & P.G Centre"
  },
  {
    "name": "S.D. College of Information Technology"
  },
  {
    "name": "S.D.G.S. Degree College (Aided), Hindupur"
  },
  {
    "name": "S.D.M.S.M KALASALA"
  },
  {
    "name": "S.D.R.R. Degree College, Mudigubba"
  },
  {
    "name": "S.D.S.(Autonomous) College of Arts & Science"
  },
  {
    "name": "S.D.V.R.R.Degree College"
  },
  {
    "name": "S.G. Govt.      Degree College,      PILER   Rural"
  },
  {
    "name": "S.G.A. Government Degree College, Yelamanchili"
  },
  {
    "name": "S.G.K. Oriental College, Tadikonda"
  },
  {
    "name": "S.G.L. (SARDAR GOWTHU LATCHANNA) DEGREE"
  },
  {
    "name": "S.G.S. (SMT. GENTELA SAKUNTALAMMA) COLLE"
  },
  {
    "name": "S.G.S. Arts College, Tiruchanoor Road, Tirupati Urban"
  },
  {
    "name": "S.G.T. & J.V.B. College, Thulluru"
  },
  {
    "name": "S.I.M.S College of Medical Lab Technology, Guntur"
  },
  {
    "name": "S.I.M.S. College of Physiotherapy, Guntur"
  },
  {
    "name": "S.K. College of Nursing, Kakinada"
  },
  {
    "name": "S.K.B.R. Govt. College, Macherla"
  },
  {
    "name": "S.K.B.R. P.G. COLLEGE"
  },
  {
    "name": "S.K.B.R.Degree College"
  },
  {
    "name": "S.K.M. College of Education"
  },
  {
    "name": "S.K.N.S. Amruthavali Mahila Kalasala, Kadiri"
  },
  {
    "name": "S.K.P. Government Degree College, Guntakal"
  },
  {
    "name": "S.K.S.D. MAHILA KALASALA UG AND PG (AUTONOMOUS)"
  },
  {
    "name": "S.K.V.R.R. DEGREE COLLEGE"
  },
  {
    "name": "S.L.G.Degree College"
  },
  {
    "name": "S.L.N. Degree College"
  },
  {
    "name": "S.L.R. PRATHIBA MODEL DEGREE COLLEGE"
  },
  {
    "name": "S.L.T.N DEGREE COLLEGE"
  },
  {
    "name": "S.L.V. College of Education, Cumbum"
  },
  {
    "name": "S.M.B.T.A.V. & S.N. DEGREE COLLEGE"
  },
  {
    "name": "S.M.J.L. Degree College, Kadiri"
  },
  {
    "name": "S.M.R & S.G.R COLLEGE"
  },
  {
    "name": "S.N.B.T. Degree College for Women, Repalle"
  },
  {
    "name": "S.N.B.T.M. College of Education, Repalle"
  },
  {
    "name": "S.N.M. Degree College"
  },
  {
    "name": "S.P.K.R COLLEGE OF EDUCATION"
  },
  {
    "name": "S.P.M.H. COLLEGE OF EDUCATION"
  },
  {
    "name": "S.P.MAHILA HINDU KALASALA"
  },
  {
    "name": "S.P.V.M. Degree College, Gorantla"
  },
  {
    "name": "S.P.W. Degree & PG College, Tirupati"
  },
  {
    "name": "S.R. Degree College, Balasamudram, Hanamkonda"
  },
  {
    "name": "S.R. Degree College, Khanapur (V&M),"
  },
  {
    "name": "S.R. Degree College, Pamidi"
  },
  {
    "name": "S.R.DEGREE COLLEGE GUDUR"
  },
  {
    "name": "S.R.Govt.      Degree    College,      PUNGANUR Rural"
  },
  {
    "name": "S.R.M. College of Education"
  },
  {
    "name": "S.R.R. & C.V.R. GOVT. DEGREE COLLEGE (AUTONOMOUS)"
  },
  {
    "name": "S.R.S.P. Degree College, Balkonda (5025)"
  },
  {
    "name": "S.R.S.V. COLLEGE OF EDUCATION"
  },
  {
    "name": "S.R.S.V.R.G.N.COLLEGE OF ARTS & SCIENCE"
  },
  {
    "name": "S.R.V.B.S.J.B.Maharani College"
  },
  {
    "name": "S.S. & N. College, Narasaraopeta"
  },
  {
    "name": "S.S.B.N. Degree College (Auonomous), Anantapur"
  },
  {
    "name": "S.S.G.S. Degree College (Aided), Guntakal"
  },
  {
    "name": "S.S.N Degree College, Podili"
  },
  {
    "name": "S.S.N. Degree College, Ongole"
  },
  {
    "name": "S.S.R.  DEGREE COLLEGE"
  },
  {
    "name": "S.S.S. Government Degree College, Bukkapatnam"
  },
  {
    "name": "S.T.S.N. Government Degree College, Kadiri"
  },
  {
    "name": "S.V Degree College Kothapalle Mitta SR Puram(M), Chittoor Dist"
  },
  {
    "name": "S.V. Agricultural College, Tirupathi"
  },
  {
    "name": "S.V. Arts & Science College, Giddaluru"
  },
  {
    "name": "S.V. Arts & Science Degree College, Gudur"
  },
  {
    "name": "S.V. Arts, Commerce & Science, Chagalamarri"
  },
  {
    "name": "S.V. College of Higher Education "
  },
  {
    "name": "S.V. College of Music and Dance, Tirupati"
  },
  {
    "name": "S.V. Degree and PG College, Nellore"
  },
  {
    "name": "S.V. Degree Colelge, Bhimadole(V&M), W.G.Dist."
  },
  {
    "name": "S.V. Degree College"
  },
  {
    "name": "S.V. Degree College D.No> 1-47, Mahaboob Bagar Kalakada (M) Chittoor Rural"
  },
  {
    "name": "S.V. Degree College, Market Road, Parkal"
  },
  {
    "name": "S.V. M. Degeree & P.G College, Gadwal"
  },
  {
    "name": "S.V.A Govt. College, Srikalahasti"
  },
  {
    "name": "S.V.Arts &  Science  College,    Kongareddipalli Urban"
  },
  {
    "name": "S.V.Arts & Science College, Gudur"
  },
  {
    "name": "S.V.Arts College      Tirupati Urban"
  },
  {
    "name": "S.V.B.S Degree College, Komarole"
  },
  {
    "name": "S.V.College of Education, RVS Nagar, Chittoor"
  },
  {
    "name": "S.V.D. GOVT. DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "S.V.Degree College"
  },
  {
    "name": "S.V.Degree College"
  },
  {
    "name": "S.V.Degree College"
  },
  {
    "name": "S.V.G. Degree College, Laxman Chanda, Adilabad 504 106"
  },
  {
    "name": "S.V.G.M. Government Degree College, Kalyandurg"
  },
  {
    "name": "S.V.Govt.Oreintal College, Palem"
  },
  {
    "name": "S.V.J.  DEGREE COLLEGE"
  },
  {
    "name": "S.V.J.V. SANSKRIT COLLEGE"
  },
  {
    "name": "S.V.K.P. College, Cumbum"
  },
  {
    "name": "S.V.K.P. Degree College, Podili"
  },
  {
    "name": "S.V.Kishore Chandradev Degree College"
  },
  {
    "name": "S.V.L. KRANTHI DEGREE COLLEGE"
  },
  {
    "name": "S.V.L.N.S.Government Degree College, Bheemunipatnam"
  },
  {
    "name": "S.V.M College of Education, Gadwal"
  },
  {
    "name": "S.V.M.R DEGREE COLLEGE"
  },
  {
    "name": "S.V.R School of Business Management"
  },
  {
    "name": "S.V.R. Government Degree College"
  },
  {
    "name": "S.V.R.M. College, Nagaram"
  },
  {
    "name": "S.V.S.R.Degree College"
  },
  {
    "name": "S.V.S.S. ARTS & SCIENCE COLLEGE"
  },
  {
    "name": "S.V.U. College of Arts, Tirupati"
  },
  {
    "name": "S.V.U. College of Commerce, Management & Information Sciences, Tirupati"
  },
  {
    "name": "S.V.U. College of Engineering, Tirupati"
  },
  {
    "name": "S.V.U. College of Sciences, Tirupati"
  },
  {
    "name": "S.V.V.S.S.Devasthanam Degree College"
  },
  {
    "name": "S.Y.T.R. Government Degree College, Madakasira"
  },
  {
    "name": "Saahithi Degree College of Science and Arts, No. 14 basthi, Yellandu"
  },
  {
    "name": "SAANVI DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "Saanvi P.G College for  Women"
  },
  {
    "name": "Saastra College of Pharmaceutical Educational & Research, Guduru."
  },
  {
    "name": "SAASTRA PHYSIOTHERAPY COLLEGE"
  },
  {
    "name": "Sacred Heart College of Arts & Science, Thallampadu"
  },
  {
    "name": "Sadana Degree College"
  },
  {
    "name": "SADHANA COLLEGE OF EDUCATION "
  },
  {
    "name": "SADHANA DEGREE COLLEGE -7069"
  },
  {
    "name": "SADHANA DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "SADHANA DEGREE COLLEGE SULTANABAD"
  },
  {
    "name": "Sadhana Degree College, Nagarkurnool"
  },
  {
    "name": "Sadhana Degree College, near MRO Office, Yellandu"
  },
  {
    "name": "Sadineni Chowdaraiah College of Arts & Science, Maddirala"
  },
  {
    "name": "Sadineni Chowdaraiah Horticultural Polytechnic"
  },
  {
    "name": "SADINENI CHOWDARAIAH POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "Safa College of Pharmacy, Kurnool"
  },
  {
    "name": "SAHARA INSTITUTE OF REHABILITATION AND DEVELOPMENT STUDIES"
  },
  {
    "name": "Sahasra Institutue of Pharmaceutical Sciences,Warangal"
  },
  {
    "name": "Sahaya College of Education, Tirupati"
  },
  {
    "name": "Sahaya College of Nursing, Chittoor"
  },
  {
    "name": "SAHITHI DEGREE COLLEGE"
  },
  {
    "name": "SAHITHI DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "SAHITHI DEGREE COLLEGE, MADDUR"
  },
  {
    "name": "Sahithi Degree Collelge,Jangaon (V&M)"
  },
  {
    "name": "SAHITHI WOMENS DEGREE COLLEGE METPALLY"
  },
  {
    "name": "Sahitya Degree College"
  },
  {
    "name": "SAI BABA BED COLLEGE AKKAYAPALLI KADAPA"
  },
  {
    "name": "SAI BALAJI COLLEGE OF MEDICAL LAB TECHNOLOGY"
  },
  {
    "name": "SAI BALAJI COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Sai Chaitanya Degree College"
  },
  {
    "name": "Sai Chaitanya Degree College Giddalur"
  },
  {
    "name": "SAI CHAITANYA DEGREE COLLEGE, NERADIGONDA"
  },
  {
    "name": "Sai College of Nursing, Rajahmundry"
  },
  {
    "name": "SAI COLLEGE OF PHYSIOTHERAPY AND REHABILITATION "
  },
  {
    "name": "Sai Deepthi College of Physical Education, Edulapalem Village, Pathipadu, Guntur District"
  },
  {
    "name": "Sai Degree College,"
  },
  {
    "name": "Sai Degree College, Markapur (Trinity)"
  },
  {
    "name": "Sai Ganapathi Engineering College for Women, Gidijala, Anandapuram (M),  PIN-531173 (CC-6F)"
  },
  {
    "name": "sai gaytri bed cololege"
  },
  {
    "name": "Sai Institute of  College of Physiotherapy"
  },
  {
    "name": "Sai Krishna P.G College, Wanaparthy"
  },
  {
    "name": "Sai Master Minds Degree College, Anantapur"
  },
  {
    "name": "Sai Parameswara Degree College"
  },
  {
    "name": "Sai Pradeep College of Education, Bestavaripeta, Prakasam District"
  },
  {
    "name": "Sai Rajeswari Institute of Technology"
  },
  {
    "name": "Sai Ram Degree College, Mudinepalli, Krishna District"
  },
  {
    "name": "SAI RAM DEGREE COLLEGE, MUKKU BACHI MALLAIAH HOUSING COMPLEX, MARKET ROAD, JAMMIKUNTA"
  },
  {
    "name": "Sai Ram Degree College, Near Bus Stand, Thorrur 506 163"
  },
  {
    "name": "Sai Samath Degree College"
  },
  {
    "name": "SAI SARANYA DEGREE COLLEGE"
  },
  {
    "name": "Sai Shree Degree College, Armoor(5075)"
  },
  {
    "name": "Sai Siddartha College of Education, Tadipatri"
  },
  {
    "name": "Sai Siddhartha Degree College, Bheemgal, Nizamabad (5072)"
  },
  {
    "name": "Sai Siddhartha Degree College, Govindpally (V), Dharpally, Nizamabad (5061)"
  },
  {
    "name": "Sai Spurthi Institute of Technology"
  },
  {
    "name": "Sai Sree Degree College"
  },
  {
    "name": "SAI SREE MAHILA DEGREE COLLEGE, DHONE"
  },
  {
    "name": "SAI SRI COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Sai Sudhir Degree & PG College"
  },
  {
    "name": "Sai Sudhir P.G. College"
  },
  {
    "name": "Sai Teja Degree College"
  },
  {
    "name": "sai teja degree college"
  },
  {
    "name": "SAI TIRUMALA NALABOTHU VENKATA RAO ENGINEERING COLLEGE"
  },
  {
    "name": "SAI VINEETH DEGREE COLLEGE"
  },
  {
    "name": "Saikrupa College of Nursing, Kadapa"
  },
  {
    "name": "Sairam Degree College"
  },
  {
    "name": "SAIRAM DEGREE COLLEGE, MOTKUR"
  },
  {
    "name": "Sairam Vidyanikethan College of Education, Penukonda"
  },
  {
    "name": "Saketa Degree College"
  },
  {
    "name": "Samaikya Degree College, H.No. 5-5-88, Kankara Boad, Mahabubabad"
  },
  {
    "name": "SAMARTHA SCHOOL OF OPTOMETRY "
  },
  {
    "name": "SAMASKARA BHARATHI DEGREE COLLEGE"
  },
  {
    "name": "Samata Degree College."
  },
  {
    "name": "SAMATHA DEGREE COLLEGE, MIRYALAGUDA"
  },
  {
    "name": "Samatha Degree College, Thorrur  506 163"
  },
  {
    "name": "Samhitha Degree College"
  },
  {
    "name": "Samskruti College of Engineering & Technology"
  },
  {
    "name": "Samskruti College of Pharmacy"
  },
  {
    "name": "Samskruti Institute of Business Management"
  },
  {
    "name": "Samyuktha Degree College"
  },
  {
    "name": "Sana College of Education, S.No. 261/B, Chemudugunta, Bujabuja, Nellore"
  },
  {
    "name": "Sana college of Pharmacy"
  },
  {
    "name": "SANA COLLEGE OF TEACHER EDUCAITON, KODAD"
  },
  {
    "name": "SANA DEGREE COLLEGE, KOILAKUNTLA"
  },
  {
    "name": "Sana Engineering College"
  },
  {
    "name": "Sandeepani Degree College, Kamareddy (5026)"
  },
  {
    "name": "Sandya Institute of Physiotherapy & Rehabilitation, Kakinada"
  },
  {
    "name": "SANGA MITHRA DEGREE COLLEGE FOR WOMEN, JAMMIKUNTA"
  },
  {
    "name": "Sanga Mithra Degree College_Siddipet"
  },
  {
    "name": "SANGA MITRA DEGREE & PG COLLEGE, AKKANNAPET ROAD, HUSNABAD"
  },
  {
    "name": "SANGAM REDDY PAIDAPU NAIDU COLLEGE OF EDUCATION"
  },
  {
    "name": "Sangamithra Degree College, H.No. 4-67/4, Near Police Station, Bhupalpally"
  },
  {
    "name": "Sangamitra College of Education"
  },
  {
    "name": "SANGHAMITRA DEGREE COLLEGE MEDCHAL KUKATPALLY"
  },
  {
    "name": "SANJANA DEGREE COLLEGE, GHANPUR"
  },
  {
    "name": "Sanjeev College of Arts and Science"
  },
  {
    "name": "SANJEEV INSTITUTE OF PLANNING and MANAGEMENT"
  },
  {
    "name": "SANJEEVA REDDY INSTITUTE OF MEDICAL SCIENCES BSC NURSING"
  },
  {
    "name": "SANJEEVANI COLLEGE OF EDUCATION, KONDAMALLEPALLY"
  },
  {
    "name": "Sanjeevani College of Physiotherapy, Hyderabad"
  },
  {
    "name": "SANJEEVANI DEGREE COLLEGE"
  },
  {
    "name": "SANKAR REDDY BED COLLEGE, BESTAVARIPETA"
  },
  {
    "name": "Sanketika Vidya Parishad Engineering College"
  },
  {
    "name": "Sanskrithi School of Business, Puttaparthi"
  },
  {
    "name": "SANSKRITHI SCHOOL OF ENGINEERING, PUTTAPARTHI"
  },
  {
    "name": "Sanskriti Degree College"
  },
  {
    "name": "SANT SAMARTH INSTITUTE OF MANAGEMENT"
  },
  {
    "name": "SANTHINIKETAN DEGREE COLLEGE"
  },
  {
    "name": "Santhiniketan Degree College, Ayyagaripet, Sathupally"
  },
  {
    "name": "Santhinikethan College of Education, Kurnool"
  },
  {
    "name": "Santhiram College of Pharmacy, Nandyal"
  },
  {
    "name": "Santhiram Engineering College, Nandyal"
  },
  {
    "name": "Santhiram Medical College, Nandyal"
  },
  {
    "name": "Santosh College of Nursing, Karimnagar"
  },
  {
    "name": "Sanviya College of Education, Bapatla"
  },
  {
    "name": "SAP Degree College"
  },
  {
    "name": "SAPTAGIRI COLLEGE OF NURSING, TIRUPATI"
  },
  {
    "name": "SAPTAGIRI DEGREE COLLEGE"
  },
  {
    "name": "Sapthagiri Degree College, Hindupur"
  },
  {
    "name": "Sapthagiri Institute of Management, Hindupur"
  },
  {
    "name": "SARADA BPED COLLEGE"
  },
  {
    "name": "SARADA COLLEGE"
  },
  {
    "name": "Sarada College of Education"
  },
  {
    "name": "Sarada College of Education, Medarametla, Prakasam District"
  },
  {
    "name": "Sarada College of Hotel Management"
  },
  {
    "name": "SARADA COLLEGE OF NURSING, MEDARAMETLA, PRAKASAM DISTRICT"
  },
  {
    "name": "Sarada College of Pharmaceutical Sciences, Narasaraopeta"
  },
  {
    "name": "SARADA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "SARADA DEGREE COLLEGE"
  },
  {
    "name": "Sarada Degree College, Medarametla"
  },
  {
    "name": "SARADA POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "Saraswathi College of Arts & Science, Dachepalli"
  },
  {
    "name": "Saraswathi College of Education Giddalur Prakasam District"
  },
  {
    "name": "Saraswathi Degree College, Marikal"
  },
  {
    "name": "Saraswathi Degree College, Tadipatri"
  },
  {
    "name": "Saraswathi Degree College, Yerrupalem"
  },
  {
    "name": "SARAYU B.ED COLLEGE, Darsi"
  },
  {
    "name": "SARAYU DEGREE COLLEGE, GUDUR"
  },
  {
    "name": "Sardar Patel College"
  },
  {
    "name": "SARDAR PATEL DEGREE COLLEGE"
  },
  {
    "name": "Sardar Vallabhai Patel D. C, Shadnagar"
  },
  {
    "name": "SARM College of Education, Allagadda"
  },
  {
    "name": "SARM Degree College"
  },
  {
    "name": "SAROJINI DEVI COLLEGE OF NURSING"
  },
  {
    "name": "Sarojini Naidu Degree & P.G College for Women"
  },
  {
    "name": "Sarojini Naidu Vanita Maha Vidyalaya"
  },
  {
    "name": "Sarojini Naidu Vanita Pharmacy Maha Vidyalaya"
  },
  {
    "name": "Sarvepally Radhakrishna Degree College"
  },
  {
    "name": "Sashikanthreddy College of Pharmacy, Nellore."
  },
  {
    "name": "Sasi Degree College"
  },
  {
    "name": "SASI DEGREE COLLEGE"
  },
  {
    "name": "Sasi Institute of Technology & Engineering, Kadakatla, Tadepalligudem,  Pin-534101(CC-K6)"
  },
  {
    "name": "SATAVAHANA COLLEGE"
  },
  {
    "name": "SATAVAHANA DEGREE COLLEGE, HUZURABAD"
  },
  {
    "name": "Satavahana University, Karimnagar"
  },
  {
    "name": "Sathabdhi Degree College"
  },
  {
    "name": "SATHAVAHANA COLLEGE OF EDUCATION (B.Ed)"
  },
  {
    "name": "SATHAVAHANA COLLEGE OF SCIENCE & ARTS"
  },
  {
    "name": "SATYA COLLEGE OF EDUCATION"
  },
  {
    "name": "SATYA Degree College"
  },
  {
    "name": "SATYA INSTITUTE OF TECHNOLOGY AND MANAGEMENT"
  },
  {
    "name": "Satya Krishna Degree College"
  },
  {
    "name": "Satya Rama Degree College"
  },
  {
    "name": "Satyam College of Education, Kodumur"
  },
  {
    "name": "SATYAM COLLEGE OF NURSING"
  },
  {
    "name": "Satyam College of Nursing, Rajahmundry"
  },
  {
    "name": "SAV & NVJR DEGREE COLLEGE"
  },
  {
    "name": "SAVE College of Nursing, Tirupati"
  },
  {
    "name": "SAVEERA COLLEGE OF NURSING"
  },
  {
    "name": "SBGR Degree College, Pakala Rural"
  },
  {
    "name": "SBS Degree College"
  },
  {
    "name": "SBSYM Degree College"
  },
  {
    "name": "SBSYM Degree College,"
  },
  {
    "name": "SBVR Agriculture College"
  },
  {
    "name": "SBVR College of Education, Badvel"
  },
  {
    "name": "Scholars Degree College"
  },
  {
    "name": "Scholars Degree College, Wanaparthy"
  },
  {
    "name": "Scholors College of Education, Wanaparthy"
  },
  {
    "name": "SCHOOL OF MANAGEMENT STUDIES"
  },
  {
    "name": "SCHOOL OF MANAGEMENT STUDIES J N T UNIVERSITY HYDERABAD"
  },
  {
    "name": "School of Planning & Architecture Vijaywada"
  },
  {
    "name": "SCHOOL OF PLANNING AND ARCHITECTURE"
  },
  {
    "name": "SCHOOL OF PLANNING AND ARCHTECTURE"
  },
  {
    "name": "SCIENT INSTITUTE OF PHARMACY"
  },
  {
    "name": "Scient Institute of Technology"
  },
  {
    "name": "SCNR Govt.Degree College"
  },
  {
    "name": "SDGS PG Department of Management, Hindupur"
  },
  {
    "name": "SDHR Degree College"
  },
  {
    "name": "SDHR Degree College, Tirupati"
  },
  {
    "name": "SDM COLLEGE OF LAW "
  },
  {
    "name": "SDS MEMORIAL TEACHER TRAINING COLLEGE"
  },
  {
    "name": "Seelam Pulla Reddy Memorial Degree College, CPS Road, Madhira"
  },
  {
    "name": "SEICOM Degree College, Kalikiri"
  },
  {
    "name": "SEICOM Degree College, Tirupati"
  },
  {
    "name": "Seshachala College of Pharmacy,Tirupati Puttur"
  },
  {
    "name": "Seshachala Degree      College, Puttur Rural"
  },
  {
    "name": "Seshachala Institute of Management Studies, Puttur"
  },
  {
    "name": "SESHACHALA VENKATA SUBBAIAH COLLEGE (B P Ed), IPPATHANGALE"
  },
  {
    "name": "SESHACHALA VENKATASUBBIAH DEGREE COLLEGE"
  },
  {
    "name": "SESHADRI RAO GUDLAVALLERU ENGINEERING COLLEGE"
  },
  {
    "name": "Seven Hiils College of Pharmacy, Tirupati"
  },
  {
    "name": "Seven Hills College of Education"
  },
  {
    "name": "SGK Govt Degree College, Vinukonda"
  },
  {
    "name": "SGS Govt, IASE"
  },
  {
    "name": "SGTRM Govt. Degree College, Yerraguntla"
  },
  {
    "name": "Shaarvani Degree College, 5-9-171 and 172, Kishanpura, Hanamkonda  506 001"
  },
  {
    "name": "SHAARVANI INSTITUTE OF PARA MEDICAL SCIENCES"
  },
  {
    "name": "Shadan College of Education"
  },
  {
    "name": "Shadan College of Engineering & Technology"
  },
  {
    "name": "Shadan College of Medical Lab Technology, Hyderabad"
  },
  {
    "name": "SHADAN COLLEGE OF NURSING"
  },
  {
    "name": "Shadan College of Pharmacy"
  },
  {
    "name": "Shadan Degree College for Men"
  },
  {
    "name": "Shadan Degree College for Women"
  },
  {
    "name": "Shadan Inst. of Medical Sciences College of Nursing, Hyderabad"
  },
  {
    "name": "Shadan Institute of Computer Studies (Boys)"
  },
  {
    "name": "Shadan Institute of Computer Studies (Girls)"
  },
  {
    "name": "Shadan Institute of Management Studies for Boys"
  },
  {
    "name": "Shadan Institute of Management Studies for Gilrs"
  },
  {
    "name": "Shadan Institute of Medical Sciences, Hyderabad"
  },
  {
    "name": "Shadan Women's College of Engineering & Technology"
  },
  {
    "name": "Shadan Women's College of Pharmacy"
  },
  {
    "name": "Shadhan Institute of Medical Sciences Teaching Hospital and Research Center, College of Physiotheraphy,Hyderabad"
  },
  {
    "name": "Shahjahan College of Business Management"
  },
  {
    "name": "Shahnaz College of Education"
  },
  {
    "name": "Shaida College of Education, Plot No 259/1C, Darsi, Prakasam District"
  },
  {
    "name": "Shalivahana Degree College"
  },
  {
    "name": "SHALIVAHANA DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "Shams-Ul-Uloom College of Education, Podili"
  },
  {
    "name": "Shams-Ul_Uloom College of Education, Markapur"
  },
  {
    "name": "Shankar Reddy Institute of Pharmaceutical Sciences, Bestavaripeta (M),  PIN-523346(CC-9K)"
  },
  {
    "name": "SHANKARI DEGREE COLLEGE"
  },
  {
    "name": "Shanthi College of Nursing, Hyderabad"
  },
  {
    "name": "SHANTHINIKETHAN DEGREE COLLEGE KAMPASAGAR"
  },
  {
    "name": "SHANTHINIKETHAN PG COLLEGE, MIRYALAGUDA"
  },
  {
    "name": "Shanthiram College of Nursing, Nandyal"
  },
  {
    "name": "SHANTINIKETAN DEGREE COLLEGE, MIRYALAGUDA"
  },
  {
    "name": "SHANTINIKETHAN COLLEGE OF EDUCAIOTION, MIRYALAGUDA"
  },
  {
    "name": "Shantinikethan Degree College for Women"
  },
  {
    "name": "Sharada Degree College"
  },
  {
    "name": "Sharada Post-Graduate Institute of Research & Technological Sciences"
  },
  {
    "name": "Sharadha Vidyalaya Degree & P.G College "
  },
  {
    "name": "Shashank Degree & PG College, Banswada (5027)"
  },
  {
    "name": "Sheela mantula Veera Suryavatamma Degree College"
  },
  {
    "name": "Shine India Degree College"
  },
  {
    "name": "Shirdi Women's Degree College"
  },
  {
    "name": "Shiridi Sai College of Education, Markapur, Prakasham District"
  },
  {
    "name": "SHIRIDI SAI DEGREE COLLEGE"
  },
  {
    "name": "shiva reddy memorial college of physical education"
  },
  {
    "name": "SHIVAM COLLEGE OF HOTEL MANAGEMENT    "
  },
  {
    "name": "Shivani Arts & Science Degree College for Women, Maruthi Nagar, Mandamarri"
  },
  {
    "name": "SHIVANI DEGREE & PG COLLEGE , MANKAMMATHOTA, KARIMNAGAR"
  },
  {
    "name": "SHIVANI DEGREE COLLEGE"
  },
  {
    "name": "Shivani Degree College, Gullapalli"
  },
  {
    "name": "Shivani Womens Degree College"
  },
  {
    "name": "SHREE SAADHANA DEGREE COLLEGE"
  },
  {
    "name": "Shree Shakthi College of Hotel Management"
  },
  {
    "name": "Shree Swaminarayan Gurukul College of Education"
  },
  {
    "name": "Shree Uma degree & P.G College"
  },
  {
    "name": "SHREE VASHISTA B.Ed. COLLEGE"
  },
  {
    "name": "SHREE VASHISTA COLLEGE OF EDUCATION NEAR VAARTHA UNIT, ALGUNOOR, THIMMAPUR, KARIMNAGAR"
  },
  {
    "name": "Shri Gnanambica Degree College, Madanapalli"
  },
  {
    "name": "Shri P.Basireddy College of Law"
  },
  {
    "name": "Shri Shiridi Sai Ram Degree College, Atmalur"
  },
  {
    "name": "Shri V. D. Bajaj  Degree College for Women"
  },
  {
    "name": "Shri Vishnu College Of Pharmacy"
  },
  {
    "name": "Shri Vishnu Engineering College for Women, Vishnupur, Kovvada Village, Bhimavaram, PIN-534202(CC-B0)"
  },
  {
    "name": "Shri Vivekananda Institute of Science, Guntakal"
  },
  {
    "name": "Sibar Institute of Dental Sciences, Guntur"
  },
  {
    "name": "SIDDAMURTHY MALLIKHARJUNA REDDY COLLGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "Siddardha College Of Education"
  },
  {
    "name": "Siddardha College of Education, Musunoor, Kavali"
  },
  {
    "name": "SIDDARTHA COLLEGE OF PHYSICAL EDUCATION -TIRUPATI"
  },
  {
    "name": "SIDDARTHA DEGREE COLLEGE"
  },
  {
    "name": "Siddartha Degree College, Armoor, Nizamabad (5065)"
  },
  {
    "name": "SIDDARTHA DEGREE COLLEGE, BAYYARAM"
  },
  {
    "name": "Siddartha Degree College, Siddartha Nagar, Narsampet"
  },
  {
    "name": "SIDDARTHA DEGREE&PG COLLEGE, NALGONDA"
  },
  {
    "name": "Siddartha Educational Academy Group of Institutions (Integrated Campus)  Tirupathi"
  },
  {
    "name": "SIDDARTHA INSTITUTE OF SCIENCE AND TECHNOLOGY "
  },
  {
    "name": "SIDDHARDHA B.ED. COLLEGE"
  },
  {
    "name": "Siddhardha Degree College, Katrenikona, E.G.Dist."
  },
  {
    "name": "SIDDHARTH DEGREE COLLEGE,West Godavari"
  },
  {
    "name": "Siddharth Institute of Engineering & Technology, Puttur"
  },
  {
    "name": "SIDDHARTHA ACADEMY OF HIGHER EDUCATION"
  },
  {
    "name": "Siddhartha College of Education"
  },
  {
    "name": "SIDDHARTHA COLLEGE OF PHYSICAL EDUCATION, IBRAHIMPATNAM"
  },
  {
    "name": "Siddhartha Degree & P.G College (Kukatpally)"
  },
  {
    "name": "Siddhartha Degree College"
  },
  {
    "name": "SIDDHARTHA DEGREE COLLEGE"
  },
  {
    "name": "Siddhartha Degree College (Co-Education)"
  },
  {
    "name": "SIDDHARTHA DEGREE COLLEGE (MOINABAD)"
  },
  {
    "name": "Siddhartha Degree College for Women"
  },
  {
    "name": "SIDDHARTHA DEGREE COLLEGE VELAIRPAD"
  },
  {
    "name": "SIDDHARTHA DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "Siddhartha Institute of Computer Science"
  },
  {
    "name": "Siddhartha Institute of Engineering & Technology"
  },
  {
    "name": "Siddhartha Institute of Pharmaceutical Sciences, Jonnalagadda"
  },
  {
    "name": "SIDDHARTHA INSTITUTE OF PHARMACY"
  },
  {
    "name": "Siddhartha Institute of Technology & Science"
  },
  {
    "name": "Siddhartha Institute of Technology & Science (formerly Siddharatha Technical Institute)"
  },
  {
    "name": "SIDDHARTHA INSTITUTE OF TECHNOLOGY AND SCIENCES"
  },
  {
    "name": "SIDDHARTHA INSTT.OF HOTEL MANAGEMENT & C"
  },
  {
    "name": "Siddhartha Medical College, Vijayawada"
  },
  {
    "name": "Siddhartha Women's Degree College"
  },
  {
    "name": "Siddhartha Womens Degree College"
  },
  {
    "name": "SIDDI DEGREE COLLEGE"
  },
  {
    "name": "SIDDU COLLEGE OF EDUCAION, HUZURNAGAR"
  },
  {
    "name": "Sidhartha Institute of Higher learning, Madanapalle  Urban"
  },
  {
    "name": "Sigma College of Nursing, Hyderabad"
  },
  {
    "name": "Silver Jubilee College (PG), Kurnool"
  },
  {
    "name": "Silver Jubilee Degree  College (Autonomous)"
  },
  {
    "name": "Silver Jubilee Degree College"
  },
  {
    "name": "SILVER JUBILEE DEGREE COLLEGE FOR WOMEN, HABSIGUDA"
  },
  {
    "name": "Simhadri Educational Society Group of Institutions, Narapadu (V), Sabbavaram Mandal, Sabbavaram To Ankapalli Road, PIN- 531002 (CC-6J)"
  },
  {
    "name": "SIMS College of Education, Guntur"
  },
  {
    "name": "SIMS College of Life Sciences, Guntur"
  },
  {
    "name": "SIMS College of Nursing, Guntur"
  },
  {
    "name": "SIMS College of Pharmacy, Guntur"
  },
  {
    "name": "SIMS Institute of Nursing, Guntur"
  },
  {
    "name": "Sindhu Degree College"
  },
  {
    "name": "Sindu Degree College"
  },
  {
    "name": "Singareni Collieries Womens Degree College, Kothagudem"
  },
  {
    "name": "Singareni Mahila Degree College, # 16-41, Andugulapet (V), Mandamarri"
  },
  {
    "name": "Sir C R Reddy College for Women"
  },
  {
    "name": "SIR C R REDDY COLLEGE OF NURSING"
  },
  {
    "name": "SIR C.R. REDDY COLLEGE"
  },
  {
    "name": "Sir C.R.R College of Education, Eluru"
  },
  {
    "name": "Sir C.R.R. College Of Engineerng"
  },
  {
    "name": "Sir C.R.Reddy. College Of Pharmaceutical Sciences"
  },
  {
    "name": "Sir C.V. Raman Degree College, Tadipatri"
  },
  {
    "name": "Sir C.V. Raman Institute of Technology & Sciences, Tadipatri,"
  },
  {
    "name": "Sir C.V.RAMAN INSTITUTE OF MANAGEMENT STUDIES"
  },
  {
    "name": "Sir CR Reddy College PG Management Studies"
  },
  {
    "name": "Sir CRR College (PG Courses)"
  },
  {
    "name": "SIREESHA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Siriki College of Education for Women"
  },
  {
    "name": "Sister Care College of Nursing, Guntur"
  },
  {
    "name": "Sita Ramaiah College of Nursing, Hyderabad"
  },
  {
    "name": "SITARAMA Degree college"
  },
  {
    "name": "Sitarama Degree College, Sitaramapuram"
  },
  {
    "name": "Siva Sivani Degree College"
  },
  {
    "name": "Sivananda College of Nursing, Karimnagar"
  },
  {
    "name": "SKLN RAO COLLEGE OF EDUCATION "
  },
  {
    "name": "SKLNR COLLEGE OF EDUCATION, SARASWATHI NAGAR, JAGTIAL"
  },
  {
    "name": "SKNR GOVERNMENT ARTS & SCIENCE COLLEGE, DHARMAPURI ROAD, JAGTIAL"
  },
  {
    "name": "SKR & SKR Govt.Degree College for Women"
  },
  {
    "name": "SKR & SKR govt.Degree College for Women (PG)"
  },
  {
    "name": "SKR Government Degree College (Women)"
  },
  {
    "name": "SKR Govt. Degree College, Gudur"
  },
  {
    "name": "SKSC Degree College"
  },
  {
    "name": "SKU College"
  },
  {
    "name": "SKU College of Education"
  },
  {
    "name": "SKU College of Engineering & Technology"
  },
  {
    "name": "SKU College of Pharmacy"
  },
  {
    "name": "SKVT Government Degree College"
  },
  {
    "name": "SLN DEGREE COLLEGE , GUNDLAPALLY (V), BEJJANKI"
  },
  {
    "name": "SLS Degree College"
  },
  {
    "name": "SML Govt. Degree College, Yemmiganur"
  },
  {
    "name": "SMS & SMCMR College of Education, Guntur"
  },
  {
    "name": "SMT AND  SRI PATAN HUSSAIN KHAN MEMORIAL POST GRADUATE COLLEGE"
  },
  {
    "name": "SMT SARASWATHAMMA COLLEGE OF NURSING"
  },
  {
    "name": "Smt. A. Shyamala Devi Degree College for Women"
  },
  {
    "name": "Smt. GOTTUMUKKALA SARASWATHI DEGREE COLLEGE"
  },
  {
    "name": "Smt. Koonapareddy Prameela Rani Degree College, Parchoor"
  },
  {
    "name": "Smt. NPS. Govt  Degree College   for  Women,      CHITTOOR Urban"
  },
  {
    "name": "Smt. SKR Degree & PG College for (W)"
  },
  {
    "name": "Smt. Theresa Arts & Science College"
  },
  {
    "name": "SMT. VELAGAPUDI DURGAMBA SIDDHARDHA LAW"
  },
  {
    "name": "Smt. Vijaya Luke College of Nursing, Visakhapatnam"
  },
  {
    "name": "Smt.Alluru Varahalamma Memorial Degree College"
  },
  {
    "name": "smt.B.S.R.College of Education,"
  },
  {
    "name": "Smt.B.S.R.Degree College"
  },
  {
    "name": "Smt.B.S.R.Degree College, Gokavaram"
  },
  {
    "name": "Smt.BARLA SUBBALAKSHMI DEGREE COLLEGE"
  },
  {
    "name": "Smt.Basava Mangayamma Memorial Degree College"
  },
  {
    "name": "Smt.Basava Rama Tarakam Memorial Law College"
  },
  {
    "name": "Smt.J.B.Degree College"
  },
  {
    "name": "Smt.NARAYANAMMA COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "Smt.Sakunthala Devi Degree College"
  },
  {
    "name": "Smt.Sarojini Ramulamma College of Pharmacy, Mahabubnagar"
  },
  {
    "name": "Smt.YRM DEGREE COLLEGE, Kalwakurthy"
  },
  {
    "name": "SNEHA BED COLLEGE, Tarlupadu"
  },
  {
    "name": "Sneha College of Nursing, Nalgonda"
  },
  {
    "name": "Sneha Degree College"
  },
  {
    "name": "Sneha Degree College, Government Hospital Road, Yellandu"
  },
  {
    "name": "SNR DEGREE COLLEGE"
  },
  {
    "name": "SNR Degree College, Karivena, Atmakur"
  },
  {
    "name": "SNSR Degree College"
  },
  {
    "name": "Social Welfare Residential Government Degree College for Girls, Kanchikacherla"
  },
  {
    "name": "Social Welfare Residential Govt.Degree College for Girls"
  },
  {
    "name": "SOGHRA COLLEGE OF TEACHER EDUCAITON, KONDA BHEEMANAPALLY"
  },
  {
    "name": "SOUTHERN INTERNATIONAL HOTEL MANAGEMENT ACADEMY"
  },
  {
    "name": "SP Ram Rayalaseema Degree College, Chandragiri"
  },
  {
    "name": "Space Degree College for Women, Kadiri"
  },
  {
    "name": "SPACES Degree College"
  },
  {
    "name": "SPANDANA DEGREE COLLEGE (Co-Education)"
  },
  {
    "name": "SPANDANA DEGREE&PG COLLEGE, SURYAPET"
  },
  {
    "name": "SPBVD Degree College, Podalakur"
  },
  {
    "name": "SPECTRUM INSTITUTE OF MANAGEMENT AND COMPUTER SCIENCES    "
  },
  {
    "name": "Sphoorthy Engineering College"
  },
  {
    "name": "SPIRITS Degree College"
  },
  {
    "name": "Spoorthi Degree College, Kothakota"
  },
  {
    "name": "Spoorthy Degree & P.G. College"
  },
  {
    "name": "SPOORTHY DEGREE COLEGE"
  },
  {
    "name": "SPOORTHY DEGREE COLLEGE"
  },
  {
    "name": "Spoorthy Degree College (Sangareddy)"
  },
  {
    "name": "Spoorthy Women's Degree College"
  },
  {
    "name": "SPR DEGREE COLLEGE"
  },
  {
    "name": "SPR Degree College, Dichpally (5050)"
  },
  {
    "name": "SPY Reddy College for Women"
  },
  {
    "name": "SR & BGNR Government Arts & Science College (Autonomous), Khammam"
  },
  {
    "name": "SR AGRICULTURAL POLYTECHNIC, KOILKUNTLA"
  },
  {
    "name": "SR BUGGARAMESWARA DEGREE COLLEGE ORVAKAL"
  },
  {
    "name": "SR College of Teacher Education"
  },
  {
    "name": "SR INTERNATIONAL INSTITUTE OF TECHNOLOGY"
  },
  {
    "name": "SR University"
  },
  {
    "name": "Sraddha Degree College, Mudhole (V&M)"
  },
  {
    "name": "Sravanthi College of Education, Dharmaram"
  },
  {
    "name": "Sree Chaitanya College of Engineering"
  },
  {
    "name": "Sree Chaitanya Degree College"
  },
  {
    "name": "SREE CHAITANYA DEGREE COLLEGE CHOPPADANDI"
  },
  {
    "name": "sree chaitanya degree college kavali"
  },
  {
    "name": "SREE CHAITANYA DEGREE COLLEGE, GOLLAPALLY"
  },
  {
    "name": "SREE CHAITANYA DEGREE COLLEGE, M.M.THOTA, KARIMNAGAR"
  },
  {
    "name": "Sree Chaitanya Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Sree Chaitanya Institute of Technological Sciences"
  },
  {
    "name": "Sree Chaitanya PG College (MBA)"
  },
  {
    "name": "SREE DATTHA BRINDAVAN INSTITUTE OF TEACHERS EDUCATION "
  },
  {
    "name": "Sree Dattha Group of Institutions"
  },
  {
    "name": "SREE DATTHA INSTITUTE OF  ENGINEERING AND SCIENCE"
  },
  {
    "name": "Sree Dattha Institute of Pharmacy"
  },
  {
    "name": "Sree Gayathri Degree College Ibrahimpatnam"
  },
  {
    "name": "Sree Kasyap Degree College"
  },
  {
    "name": "Sree Kavitha College of Management and Information Technology"
  },
  {
    "name": "SREE KONASEEMA BHANOJI RAMARS COLLEGE"
  },
  {
    "name": "SREE LAGUDU SIMHADRI COLLEGE OF EDUCATION"
  },
  {
    "name": "SREE LAKSHMI SREENIVASA COLLEGE OF EDUCATION ,KURNOOL"
  },
  {
    "name": "SREE MARUTHI DEGREE COLLEGE"
  },
  {
    "name": "Sree Narayana Nursing College, Nellore"
  },
  {
    "name": "SREE RAGHAVENDRA VIDYALAYAM, ARMOOR"
  },
  {
    "name": "Sree Raghavendra Vidyalayam, Armoor (5297)"
  },
  {
    "name": "Sree Rama Engineering College, Tirupati"
  },
  {
    "name": "Sree Ramchandra Arts & Science College"
  },
  {
    "name": "Sree Ratna College of Physiotherapy, Hyderabad"
  },
  {
    "name": "SREE RATNA DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "Sree Rayalaseema Christian College of Education, Kurnool"
  },
  {
    "name": "Sree Sai Degree College, Kalwakurthy"
  },
  {
    "name": "Sree Sai Degree College, Kavali"
  },
  {
    "name": "SREE SAI DEGREE COLLEGE, KODAKANDLA"
  },
  {
    "name": "Sree Sai Dental College & Research Inst., Srikakulam"
  },
  {
    "name": "Sree Siddhartha Degree College"
  },
  {
    "name": "SREE SREE VEERABHADRA SWAMY DEGREE COLLEGE, KURAVI"
  },
  {
    "name": "SREE SRINIVASA COLLEGE OF NURSING ANANTAPUR"
  },
  {
    "name": "Sree Tirumalesa Degree College"
  },
  {
    "name": "Sree Vahini Institute of Science & Technology"
  },
  {
    "name": "Sree Vani Women's Degree & P.G College"
  },
  {
    "name": "SREE VASAVI DEGREE COLLEGE"
  },
  {
    "name": "SREE VENKATESHWARA COMMERCE DEGREE COLLEGE, KARMANGHAT"
  },
  {
    "name": "Sree Venkateshwara Degree College"
  },
  {
    "name": "SREE VENKATESWARA COLLEGE OF ENGINEERING"
  },
  {
    "name": "SREE VENKATESWARA COLLEGE OF PHARMACY"
  },
  {
    "name": "SREE VENKATESWARA DEGREE COLLEGE, B. MATTAM"
  },
  {
    "name": "SREE VENKATESWARA PHARMACY COLLEGE"
  },
  {
    "name": "Sree Vidya Arts & Science Degree College Yadamarri"
  },
  {
    "name": "Sree Vidya Arts & Science Degree College, Sai Nagar"
  },
  {
    "name": "Sree Vidyanikethan  Engineering College,  Tirupathi,"
  },
  {
    "name": "SREE VIDYANIKETHAN COLLEGE OF EDUCATION "
  },
  {
    "name": "Sree Vidyanikethan College of Nursing, Tirupati"
  },
  {
    "name": "Sree Vidyanikethan Degree College, A.Rangampet, Tirupati."
  },
  {
    "name": "Sree Vignan Degree College"
  },
  {
    "name": "Sree Vignan Degree College, Amadaguru"
  },
  {
    "name": "SREE VYSHNAVI MBA COLLEGE GOOTY"
  },
  {
    "name": "Sreedevi Degree College, Borampalli, Kalyandurg"
  },
  {
    "name": "SREENIDHI DEGREE COLLEGE, KURIKYAL"
  },
  {
    "name": "SREENIDHI DEGREE COLLEGE, MADHIRA"
  },
  {
    "name": "Sreenidhi University"
  },
  {
    "name": "Sreenidi Institute of Science &Technology"
  },
  {
    "name": "Sreenivasa Degree College, Dharmavaram"
  },
  {
    "name": "Sreenivasa Degree College, Kalikiri Chittoor District"
  },
  {
    "name": "Sreenivasa Inst. of Technology & Management Studies, Thimmasamudram, Chittoor"
  },
  {
    "name": "SREEPAADA Degree College"
  },
  {
    "name": "SreeRama Institute of Management"
  },
  {
    "name": "SREYAS INSTITUTE OF ENGINEERING & TECHNOLOGY, TATTIANNNARAM"
  },
  {
    "name": "Sri  Srinivasa Degree College, Kollapur"
  },
  {
    "name": "Sri  Venkateswar  College of Engineering &Technology, RVS Murukambattu, Chittoor"
  },
  {
    "name": "Sri  Venkateswara  College of Engineering, Karakambadi Road, Tirupathi"
  },
  {
    "name": "Sri A. S. N. M. Government College, Palakol"
  },
  {
    "name": "Sri Adarsh Degree College"
  },
  {
    "name": "Sri Adi Narayana Mahila Kalasala, Anakapalle"
  },
  {
    "name": "SRI ADI SHIVA SADGURU ALLI SAHEB SIVAARYULA HOMEOPATHY MEDICAL COLLEGE, GUNTAKAL"
  },
  {
    "name": "Sri Adi Siva Sadguru College of B.Sc. MLT, Guntakal"
  },
  {
    "name": "Sri Adisiva Sadguru Alli Saheb Sivaarvyula Ayurvedic Medicakal College, Thimmapuram, Guntakal"
  },
  {
    "name": "Sri Aditya Degree College"
  },
  {
    "name": "SRI ADITYA DEGREE COLLEGE"
  },
  {
    "name": "Sri Akshara Degree College, Gate Venture, Ponnavaram, Verullapadu,Krishna District."
  },
  {
    "name": "Sri Annamacharya Institute of Technology & Science"
  },
  {
    "name": "SRI ARUNODAYA DEGREE COLLEGE KATHALAPUR"
  },
  {
    "name": "Sri Arunodaya Degree College, Amba Complex, Bheemaram, Hasanparthy (M)"
  },
  {
    "name": "SRI ARUNODAYA DEGREE COLLEGE, KORATLA"
  },
  {
    "name": "Sri Aurbindo Degree College"
  },
  {
    "name": "SRI AUROBINDO COLLEGE OF EDUCATION"
  },
  {
    "name": "Sri Aurobindo Degree College, Jangaon (V&M)"
  },
  {
    "name": "Sri Aurobindo Institute of Education, Jangaon"
  },
  {
    "name": "Sri Ayyappa Swamy Degree College, Makthal"
  },
  {
    "name": "Sri B.Ayyavaru Reddy Memorial College of Nursing, Kadapa"
  },
  {
    "name": "Sri Balaji College of Education, Anantapur"
  },
  {
    "name": "SRI BALAJI COLLEGE OF EDUCATION, KANIGIRI"
  },
  {
    "name": "SRI BALAJI DEGREE COLLEGE"
  },
  {
    "name": "Sri Balaji Degree College"
  },
  {
    "name": "Sri Balaji Dental College"
  },
  {
    "name": "SRI BALAJI MEDICAL COLLEGE, HOSPITAL AND RESEARCH INSTITUTE"
  },
  {
    "name": "Sri Balaji P.G College"
  },
  {
    "name": "SRI BALAJI PG COLLEGE (MBA), ALAMURU (P), RUDRAMPETA"
  },
  {
    "name": "SRI BALAJI PG COLLEGE (MCA), ALAMURU (P), RUDRAMPETA"
  },
  {
    "name": "SRI BALAJI PHYSICAL EDUCATION, KANIGIRI"
  },
  {
    "name": "Sri Balaji Vidya Parishad Degree College"
  },
  {
    "name": "Sri Balaji Vidya Vihar Degree College, Hindupur"
  },
  {
    "name": "SRI BALASAI DEGREE COLLEGE"
  },
  {
    "name": "SRI BASARA DEGREE COLLEGE"
  },
  {
    "name": "SRI BHANODAYA COLLEGE OF EDUCATION"
  },
  {
    "name": "Sri Bharathi   Degree College, Piler  Rural"
  },
  {
    "name": "SRI BHARATHI B.ED COLLEGE"
  },
  {
    "name": "SRI BHARGAVI COLLEGE OF NURSING"
  },
  {
    "name": "Sri Bhavana College of Nursing, Nalgonda"
  },
  {
    "name": "SRI BIJIVEMULA VEERA REDDY EDUCATIONAL GROUP"
  },
  {
    "name": "Sri Bijju Ananthaiah Memorial Degree College, Shadnagar"
  },
  {
    "name": "Sri Boddu Krishna Degree College"
  },
  {
    "name": "Sri Bramarambika Mallikarjuna College of Education, Kalwakurthy"
  },
  {
    "name": "Sri BVR Degree College"
  },
  {
    "name": "Sri C.V. Raman College of Computer Science, Podili"
  },
  {
    "name": "Sri Caitanya College of Engg& Tech,and Sri Chaitanya College of Business  Management"
  },
  {
    "name": "SRI CHAITANY DEGREE COLLEGE, DHARMAPURI"
  },
  {
    "name": "Sri Chaitanya College Of Education"
  },
  {
    "name": "Sri Chaitanya College of Education, Bodhan (5286)"
  },
  {
    "name": "Sri Chaitanya College of Education, Podili"
  },
  {
    "name": "Sri Chaitanya College of Nursing, Tirupati"
  },
  {
    "name": "Sri Chaitanya Degree & P.G College, Mahabubnagar"
  },
  {
    "name": "Sri Chaitanya Degree College"
  },
  {
    "name": "Sri Chaitanya Degree College"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE"
  },
  {
    "name": "Sri Chaitanya Degree College (Dubbaka)"
  },
  {
    "name": "Sri Chaitanya Degree College (Ghatkesar)"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE (HYDER NAGAR)"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE (MADINAGUDA)"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE B KOTHAKOTA"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE DHARMAPURI"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE MIRYALGUDA"
  },
  {
    "name": "Sri Chaitanya Degree College, Bheemaram,Warangal"
  },
  {
    "name": "Sri Chaitanya Degree College, Bukkarayasamudram, Anantapuramu."
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE, KOWTALA"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE, MAAL"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE, NALGONDA"
  },
  {
    "name": "Sri Chaitanya Degree College, Near Bus Stand, Narsampet"
  },
  {
    "name": "Sri Chaitanya Degree College, Rajampet, Asifabad"
  },
  {
    "name": "SRI CHAITANYA DEGREE COLLEGE-JAGITIAL"
  },
  {
    "name": "Sri Chaitanya Degree College582"
  },
  {
    "name": "Sri Chaitanya Institute of Technology and Research (SCIT)"
  },
  {
    "name": "SRI CHAITANYA TECHNICAL CAMPUS"
  },
  {
    "name": "SRI CHAITANYA WOMENS DEGREE COLLEGE, LB NAGAR, BHUPALPALLY"
  },
  {
    "name": "SRI CHAITHANYA DEGREE COLLEGE FOR COEDUCATION"
  },
  {
    "name": "SRI CHAITNYA DEGREE COLLEGE,  MAIN ROAD, GODAVARIKHANI"
  },
  {
    "name": "SRI CHAKRA COLLEGE OF EDUCATION, IBRAHIMPATNAM"
  },
  {
    "name": "SRI CHALAPATI DEGREE COLLEGE"
  },
  {
    "name": "Sri Chanakya Degree College"
  },
  {
    "name": "SRI CHANDRA DEGREE COLLEGE"
  },
  {
    "name": "Sri Chandra Reddy Degree College, Nellore"
  },
  {
    "name": "SRI CHINTALAPATI VARAPRASADA MURTHY RAJU GOVERNMENT DEGREE COLLEGE "
  },
  {
    "name": "Sri Chittem Narsi Reddy Memorial Govt. Degree College, Narayapet"
  },
  {
    "name": "Sri Datta Brindavana Institute of Teacher Education, Narayanpet"
  },
  {
    "name": "Sri Datta Sai College of  MCA"
  },
  {
    "name": "SRI DATTA SAI SCHOOL OF BUSINESS, PRAKSASAMPALLI (V), KOPPARTHI (P)"
  },
  {
    "name": "Sri Deepthi Mahila Degree College"
  },
  {
    "name": "SRI DUGGANAPALLI KRISHNAREDDY DEGREE COLLEGE. VEERABALLI"
  },
  {
    "name": "Sri Eshwar Reddy College of Law, Tirupati"
  },
  {
    "name": "Sri Gaayathri College of Management Sciences, Mulug Road, Warangal"
  },
  {
    "name": "Sri Gaayathri Degree College, Ramnagar, Hanamkonda"
  },
  {
    "name": "Sri Gayatri Degree College"
  },
  {
    "name": "SRI GAYATRI DEGREE COLLEGE DWARAPUDI VIZIANAGARAM"
  },
  {
    "name": "Sri Gayatri Vidya Parishad Degree College, Kandukuru"
  },
  {
    "name": "SRI GAYATRI WOMENS DEGREE COLLEGE"
  },
  {
    "name": "SRI GEERVANI COLLEGE OF EDUCATION (B.Ed.)"
  },
  {
    "name": "Sri Gowri Degree College"
  },
  {
    "name": "Sri Gowtham Degree College, Kandulapuram"
  },
  {
    "name": "SRI GOWTHAMI B.ED COLLEGE, YERRAGONDAPALEM"
  },
  {
    "name": "Sri Gowthami College of Education, Darsi"
  },
  {
    "name": "SRI GOWTHAMI DEGREE COLELGE, NARSAPUR, W.G.DIST"
  },
  {
    "name": "Sri Gowthami Degree College Yerragondapalem"
  },
  {
    "name": "SRI GOWTHAMI DEGREE COLLEGE, CHIMAKURTHY, "
  },
  {
    "name": "SRI GOWTHAMI DEGREE COLLEGE, CHIRALA"
  },
  {
    "name": "Sri Gowthami Degree College, Darsi"
  },
  {
    "name": "SRI GOWTHAMI DEGREE COLLEGE, DONAKONDA, PRAKASAM DISTRICT"
  },
  {
    "name": "Sri Gowthami Degree College, Jinnuru(V)"
  },
  {
    "name": "SRI GOWTHAMI DEGREE COLLEGE, SANTHANUTHALAPADU"
  },
  {
    "name": "Sri Gujarathi Vidhya Mandir Degree College for Women"
  },
  {
    "name": "SRI GURUDATTA DEGREE COLLEGE"
  },
  {
    "name": "SRI HAMSAVAHINI DEGREE COLLEGE"
  },
  {
    "name": "SRI HARA DEGREE COLLEGE"
  },
  {
    "name": "Sri Hari Degree College"
  },
  {
    "name": "Sri Hari Degree College(047), Balaji Nagar, Kadapa, Andhra Pradesh"
  },
  {
    "name": "SRI HARI FISHERY POLYTECHNIC"
  },
  {
    "name": "SRI HARI POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "Sri Harsha B.Ed College, Chetticherla Village, Bestavaripeta, Prakasam District"
  },
  {
    "name": "SRI HARSHA DEGREE COLLEGE FOR WOMEN MACHERLA"
  },
  {
    "name": "SRI HARSHA DEGREE COLLEGE, GOUTHAMI NAGAR, MANCHERIAL"
  },
  {
    "name": "Sri Harsha Institute of PG Studies"
  },
  {
    "name": "Sri Harsha's Womens Degree College, Cumbum"
  },
  {
    "name": "Sri Harshini Degree College, Martur"
  },
  {
    "name": "Sri Harshini Degree College, Ongole"
  },
  {
    "name": "SRI HARSHITHA DEGREE COLLEGE,KATARAM"
  },
  {
    "name": "SRI HINDU DEGREE COLLEGE, RAMANNAPET"
  },
  {
    "name": "Sri Indu College of Education"
  },
  {
    "name": "Sri Indu College of Engineering & Technology"
  },
  {
    "name": "Sri Indu Institute of Engineering and Technology"
  },
  {
    "name": "Sri Indu Institute of Management"
  },
  {
    "name": "Sri Indu Institute of Pharmacy"
  },
  {
    "name": "Sri Indu P.G College"
  },
  {
    "name": "SRI INSTITUTE OF HOTEL MANAGEMENT AND CULINARY ARTS"
  },
  {
    "name": "Sri Jeevana Jyothi Degree College, Giddalur"
  },
  {
    "name": "SRI KAKATIYA DEGREE COLLEGE, JANGAON, TELANGANA"
  },
  {
    "name": "Sri Kakatiya Degree College, Pedakurapadu"
  },
  {
    "name": "SRI KAKATIYA DEGREE KALASALA"
  },
  {
    "name": "Sri Kakatiya Institute of Pharmaceutical Sciences, Unikicherla"
  },
  {
    "name": "Sri Kakatiya Womens Degree College"
  },
  {
    "name": "Sri Kalahasthiswara Institute of Infor. & Manag. Sciences, Sri Kalahasthi."
  },
  {
    "name": "SRI KALYANI COLLEGE OF EDUCATION, CHINNARANGAPURAM, PULIVENDULA"
  },
  {
    "name": "Sri Kandula Obula Reddy Degree College, Bestavaripeta"
  },
  {
    "name": "SRI KARIBANDI SUBBARAO MEMORIAL DEGREE COLLEGE"
  },
  {
    "name": "Sri Kavita Engineering College"
  },
  {
    "name": "SRI KINJARAPU YERRAN NAIDU COLLEGE OF AGRICULTURAL SCIENCES"
  },
  {
    "name": "Sri Kolla Appala Naidu College of Education"
  },
  {
    "name": "Sri Kolla Veera Swamy Degree College"
  },
  {
    "name": "SRI KONDA LAXMAN TELANGANA STATE HORTICULTURAL UNIVERSITY (SKLTSHU)"
  },
  {
    "name": "SRI KOTA RAGHAVAIAH DEGREE COLLEGE"
  },
  {
    "name": "SRI KRIHNAVENI DEGREE COLLEGE OF ARTS & SCIENCE"
  },
  {
    "name": "Sri Krishna Chaitanya College of Nursing, Madanapalle"
  },
  {
    "name": "Sri Krishna Chaitanya College of Pharmacy, Madanapalli"
  },
  {
    "name": "SRI KRISHNA CHAITANYA DEGREE COLLEGE, NARSARAOPET"
  },
  {
    "name": "Sri Krishna Degree College"
  },
  {
    "name": "SRI KRISHNA DEGREE COLLEGE BONDAPALLI (V AND M)"
  },
  {
    "name": "Sri Krishna Devaraya B.Ed College, Darsi, Prakasam District"
  },
  {
    "name": "SRI KRISHNA GOWTHAMI DEGREE COLLEGE, DAMMUGUDEM"
  },
  {
    "name": "SRI KRISHNA SAI DEGREE COLLEGE"
  },
  {
    "name": "Sri Krishnadevaraya College of Agricultural Sciences"
  },
  {
    "name": "Sri Krishnadevaraya College of Horticultural Sciences"
  },
  {
    "name": "Sri Krishnadevaraya University, Anantapur"
  },
  {
    "name": "SRI KRISHNAVENI DEGREE COLLEGE"
  },
  {
    "name": "Sri Krishnaveni Degree College, Kalwakurthy"
  },
  {
    "name": "Sri Krupa Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Sri Kumar Degree College, Haripuram"
  },
  {
    "name": "SRI LAKSHMI BPED COLLEGE"
  },
  {
    "name": "SRI LAKSHMI INSTITUTE OF MEDICAL SCIENCES COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Sri Lakshmi Narasimha College of Pharmacy, Chittoor"
  },
  {
    "name": "SRI LAKSHMI NARASIMHA SWAMY COLLEGE, BHONGIR"
  },
  {
    "name": "Sri Lakshmi Sravani College of Education,Medarametla Village, Korisepadu Taluk, Prakasham District"
  },
  {
    "name": "SRI LAKSHMI SRAVANI DEGREE COLLEGE, ONGOLE"
  },
  {
    "name": "Sri Lakshmi Venkateswar Institute of Pharmaceutical Sciences, Proddatur"
  },
  {
    "name": "Sri Lakshmi Venkateswara College of  Education, Kurnool"
  },
  {
    "name": "SRI LAKSHMI VENKATESWARA COLLEGE OF EDUCATION,PANCHALINGALA"
  },
  {
    "name": "SRI LAKSHMI VENKATESWARA COLLEGE OF NURSING"
  },
  {
    "name": "SRI LAKSHMI VENKATESWARA DEGREE COLLEGE GURRAMKONDA"
  },
  {
    "name": "SRI LAKSHMI VENKATESWARA DEGREE COLLEGE, DHONE"
  },
  {
    "name": "SRI LAKSHMI VENKATESWARA M.Ed COLLEGE,KURNOOL"
  },
  {
    "name": "SRI LAKSHMI VIGNESWARA DEGREE COLLEGE , CHENNEKOTHAPALLI"
  },
  {
    "name": "SRI LALITHA DEVI COLLEGE OF EDUCATION,RAJAMPALLI, DARSI"
  },
  {
    "name": "SRI LENDI DEGREE COLLEGE"
  },
  {
    "name": "Sri Mahaveer Memorial Jain Degree College"
  },
  {
    "name": "Sri Majeti Guravaiah Degree College, Guntur"
  },
  {
    "name": "SRI MALLIKARJUNA BED COLLEGE DHAVEJIGUDEM GANNAVARM MANDAL"
  },
  {
    "name": "SRI MALLIKARJUNA DEGREE COLLEGE, NAKREKAL"
  },
  {
    "name": "Sri Manikanta Kannababu & Konathala Degree College"
  },
  {
    "name": "SRI MANJUNADHA COLLEGE OF EDUCATION, PODILI, PRAKASAM DISTRICT"
  },
  {
    "name": "Sri Maruthi Degree College"
  },
  {
    "name": "SRI MATHA SARASWATHI DEGREE COLLEGE, ATMAKUR"
  },
  {
    "name": "SRI MEDHA DEGREE COLLEGE NELLIMARLA"
  },
  {
    "name": "SRI MEKAPATI GOUTHAM REDDY AGRICULTURAL COLLEGE"
  },
  {
    "name": "SRI MITHRA DEGREE COLLEGE MUSTHABAD"
  },
  {
    "name": "Sri Mittapalli College of Engineering, NH-5, Tummalapalem,PIN-522 233  (CC-U9)"
  },
  {
    "name": "Sri Mittapalli Institute of Technology for Women, Tummalapalem, NH-5, PIN-522233 (CC-MK)"
  },
  {
    "name": "Sri Modamamba Degree College"
  },
  {
    "name": "SRI MUNINARAYANA DEGREE COLEGE, CHOWDEPALLI"
  },
  {
    "name": "SRI MUNINARYANA DEGREE COLLEGE"
  },
  {
    "name": "Sri Murali Krishna Degree College"
  },
  {
    "name": "SRI MVKR FISHERIES POLYTECHNIC, BHAVADEVARAPALLI"
  },
  {
    "name": "Sri N.S.N.Raju Degree College"
  },
  {
    "name": "SRI NAGARJUNA ARTS AND SCIENCE COLLEGE, CHEKURAPADU"
  },
  {
    "name": "Sri Nagarjuna Degree College"
  },
  {
    "name": "SRI NAGARJUNA DEGREE COLLEGE, MIRYALAGUDA"
  },
  {
    "name": "Sri Nagarjuna Degree College, Ongole"
  },
  {
    "name": "SRI NALANDA COLLEGE OF EDUCATION, MARTUR, BAPATLA DISTRICT"
  },
  {
    "name": "SRI NARAHARI SETTI VENKATARAO DEGREE COLLEGE"
  },
  {
    "name": "SRI NARAYANA DEGREE COLLEGE"
  },
  {
    "name": "Sri Narayanadri College of Education"
  },
  {
    "name": "SRI NAVABHARAT DEGREE & PG COLLEGE BHONGIR"
  },
  {
    "name": "SRI NAVABHARAT DEGREE COLLEGE, BHONGIR"
  },
  {
    "name": "Sri Nidhi College of Education"
  },
  {
    "name": "SRI NIKHILA DEGREE COLLEGE, CHILAKALURIPET, GUNTUR DISTRICT, 522616"
  },
  {
    "name": "Sri P. Rami Reddy Memorial College of Physiotherapy, Kadapa"
  },
  {
    "name": "Sri Padmanabha Degree College"
  },
  {
    "name": "SRI PADMAVATHI COLLEGE OF NURSING"
  },
  {
    "name": "SRI PADMAVATHI COLLEGE OF NURSING, ANANTAPUR"
  },
  {
    "name": "Sri Padmavathi College of Nursing, Guntakal"
  },
  {
    "name": "SRI PADMAVATHI COLLEGE OF NURSING, TIRUPATI"
  },
  {
    "name": "Sri Padmavathi Mahila Degree College"
  },
  {
    "name": "Sri Padmavathi Mahila Kalasala"
  },
  {
    "name": "Sri Padmavathi Mahila Visva Vidyalayam, Tirupathi"
  },
  {
    "name": "Sri Padmavathi School of Pharmacy, Tirupathi"
  },
  {
    "name": "Sri Padmavathi Studies of Computer Sciences & Technology, Tiruchanoor"
  },
  {
    "name": "Sri Padmavathi Womens   Degree College Near Gundu bavi, Madanapalle   Road, Gangavaram"
  },
  {
    "name": "Sri Palakondraya Swamy Degree College"
  },
  {
    "name": "Sri Pathanjali Maharshi Naturopathy and Yoga Medical College Guntakal"
  },
  {
    "name": "SRI PONNAVOLU GOPIREDDY B.ED COLLEGE"
  },
  {
    "name": "Sri Potti Sriramulu Degree College, Darsi"
  },
  {
    "name": "SRI PRAGNA DEGREE COLLEGE"
  },
  {
    "name": "Sri Prathibha Degree College, Kandukur"
  },
  {
    "name": "SRI PRATHIBHA DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "SRI PRATIBA DEGREE COLLEGE"
  },
  {
    "name": "Sri Pulaji Baba Degree College, # 1-36/1, Near IB Chowk, Utnoor"
  },
  {
    "name": "SRI RACHAPUDY NAGABHUSHANAM COLLEGE OF HEALTH SCIENCES"
  },
  {
    "name": "SRI RACHAPUDY NAGABHUSHANAM COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "SRI RACHAPUDY NAGABHUSHANAM DEGREE & PG COLLEGE, BADVEL"
  },
  {
    "name": "SRI RADHAKRISHNA COLLEGE OF EDUCATION"
  },
  {
    "name": "SRI RAGHAVENDRA BED COLLEGE "
  },
  {
    "name": "Sri Raghavendra College of Education, Allagadda"
  },
  {
    "name": "SRI RAGHAVENDRA COLLEGE OF EDUCATION, NALGONDA"
  },
  {
    "name": "SRI RAGHAVENDRA DEGREE COLLEGE (095) PATTIKONDA"
  },
  {
    "name": "SRI RAGHAVENDRA DEGREE COLLEGE MANTRALAYAM"
  },
  {
    "name": "SRI RAGHAVENDRA DEGREE COLLEGE, NALGONDA"
  },
  {
    "name": "SRI RAGHAVENDRA DEGREE COLLEGE-074,ALUR"
  },
  {
    "name": "SRI RAJA DEGREE COLLEGE"
  },
  {
    "name": "SRI RAJA RAJESHWARA DEGREE COLLEGE"
  },
  {
    "name": "SRI RAJA RAJESHWARI (SRR) DEGREE COLEGE"
  },
  {
    "name": "SRI RAJA RAJESWARA DEGREE COLLEGE, BAZARHATHNOOR"
  },
  {
    "name": "Sri Raja Rajeswari College of Education, Giddalur"
  },
  {
    "name": "Sri Raja Rajeswari Degre College"
  },
  {
    "name": "Sri Rajah Raghava Raju Venkata Krishnam Raju Memorial (SRRRVKRM) Degree College, # 2-108, Godavari Ferry Point Road, Venkatapuram"
  },
  {
    "name": "Sri Rajarajeswari College of Education, Pulipadu Village, Mundlamur Mandal, Prakasam District"
  },
  {
    "name": "SRI RAJIV GANDHI COLLEGE OF NURSING WEST GODAVARI TANUKU"
  },
  {
    "name": "Sri Ram Degree College"
  },
  {
    "name": "SRI RAMA ADITYA COLLEGE OF NURSING, RAMACHANDRAPURAM"
  },
  {
    "name": "Sri Rama Degree College Palakonda"
  },
  {
    "name": "SRI RAMA DEGREE COLLEGE, TANUKU"
  },
  {
    "name": "SRI RAMA DEGREE COLLEGE,VANDRANGI"
  },
  {
    "name": "Sri Rama Educational Trust College of Physiotherapy, Vizianagaram"
  },
  {
    "name": "Sri Rama Krishna Degree College, Dwarakapet Road, Narsampet"
  },
  {
    "name": "Sri Rama Krishna Degree College, Ongole"
  },
  {
    "name": "Sri Ramachandra College of Nursing, Nizamabad"
  },
  {
    "name": "SRI RAMACHANDRA DEGREE COLLEGE"
  },
  {
    "name": "Sri Ramakrishna Degree College (Autonomous)"
  },
  {
    "name": "Sri Ramakrishna Degree College, Kamareddy (5028)"
  },
  {
    "name": "Sri Ramakrishna Vivekananda D.C, Kosgi"
  },
  {
    "name": "Sri Ramalingeshwara Degree College"
  },
  {
    "name": "SRI RAMALINGESHWARA DEGREE COLLEGE NARKETPALLY"
  },
  {
    "name": "SRI RAMESWARI DEGREE COLLEGE"
  },
  {
    "name": "SRI RANGANAYAKA SWAMY COLLEGE OF PHARMACY"
  },
  {
    "name": "Sri Ravi Degree College"
  },
  {
    "name": "Sri Ravi Degree College,"
  },
  {
    "name": "SRI RAVI TEJA DEGREE COLLEGE"
  },
  {
    "name": "Sri Sadana Degree College"
  },
  {
    "name": "Sri Sadguru Alli Sabeh Swamy College of B.Sc. MLT, Guntakal"
  },
  {
    "name": "Sri Sadguru Bandayappa Swamy B.Ed. College, Bichkunda (5287)"
  },
  {
    "name": "SRI SADGURU SAI DEGREE COLLEGE"
  },
  {
    "name": "Sri Sadhana B.Ed College, Markapur"
  },
  {
    "name": "Sri Sadhana Degree College, Markapur"
  },
  {
    "name": "Sri Sadhana Degree College, Nandyal"
  },
  {
    "name": "Sri Sahasra Degree College For Women, Santosh Nagar"
  },
  {
    "name": "SRI SAI  BALAJI COLLEGE OF EDUCATION YELESWARAM"
  },
  {
    "name": "Sri Sai  Degree College, Nandipet (5030)"
  },
  {
    "name": "Sri Sai Aditya Degree College, Ponduru"
  },
  {
    "name": "SRI SAI BHARTHI DEGREE AND PG COLLEGE NALGONDA"
  },
  {
    "name": "SRI SAI CHARVITH DEGREE COLLEGE"
  },
  {
    "name": "Sri Sai College of  IT & Management"
  },
  {
    "name": "Sri Sai College of Dental Surgery, Vikarabad"
  },
  {
    "name": "Sri Sai College of Education"
  },
  {
    "name": "SRI SAI COLLEGE OF EDUCATION ONGOLE"
  },
  {
    "name": "SRI SAI COLLEGE OF EDUCATION, BUDDAYA PALLI, KADAPA"
  },
  {
    "name": "Sri Sai College of Education, Dornala"
  },
  {
    "name": "Sri Sai College of Education, Nandikotkur"
  },
  {
    "name": "Sri Sai College of Education, Nizamabad (5288)"
  },
  {
    "name": "SRI SAI COLLEGE OF NURSING NARAYANAVANAM"
  },
  {
    "name": "Sri Sai College of Nursing, Anantapur"
  },
  {
    "name": "Sri Sai College of Nursing, Nalgonda"
  },
  {
    "name": "Sri Sai College Of Pharmacy"
  },
  {
    "name": "Sri Sai College of Physiotheraphy, Nalgonda"
  },
  {
    "name": "Sri Sai Degree & P.G College"
  },
  {
    "name": "Sri Sai Degree & P.G College"
  },
  {
    "name": "Sri Sai Degree College"
  },
  {
    "name": "Sri Sai Degree College"
  },
  {
    "name": "SRI SAI DEGREE COLLEGE"
  },
  {
    "name": "SRI SAI DEGREE COLLEGE CHITVEL"
  },
  {
    "name": "Sri Sai Degree College, Anantapur"
  },
  {
    "name": "Sri Sai Degree College, D.No: 5-54, Near SBI, RLAM 535126, Vzm"
  },
  {
    "name": "Sri Sai Degree College, Dharmavaram"
  },
  {
    "name": "Sri Sai Degree College, Gooty"
  },
  {
    "name": "SRI SAI DEGREE COLLEGE, KAREMPUDI"
  },
  {
    "name": "Sri Sai Degree College, Kunavaram Road, Bhdrachalam"
  },
  {
    "name": "SRI SAI DEGREE COLLEGE, LINGAPALEM"
  },
  {
    "name": "Sri Sai Degree College, Lower Tank Bund Road, Near RTC Complex, Vzm"
  },
  {
    "name": "Sri Sai Degree College, Repalle"
  },
  {
    "name": "Sri Sai Degree College, Rly.Koduru"
  },
  {
    "name": "SRI SAI DEGREE COLLEGE, TANUKU, W.G.DISTRICT"
  },
  {
    "name": "Sri Sai Degree College, Vinukonda"
  },
  {
    "name": "Sri Sai Degree College, Visakhapatnam"
  },
  {
    "name": "Sri Sai Educational Society's Group of Institutions"
  },
  {
    "name": "Sri Sai Inst. of Technology & Science, 2/714-18, Rayachoti"
  },
  {
    "name": "Sri Sai Krishna Degree College"
  },
  {
    "name": "Sri Sai Krupa Degree College, Dharmavaram"
  },
  {
    "name": "Sri Sai Kulwant Degree College"
  },
  {
    "name": "SRI SAI LEELA COLLEGE OF EDUCATION"
  },
  {
    "name": "Sri Sai Madhavi Degree College"
  },
  {
    "name": "Sri Sai Madhavi Degree College, Anaparthi"
  },
  {
    "name": "SRI SAI MAHITHA DEGREE COLLEGE"
  },
  {
    "name": "Sri Sai MBA College, Nandikotkur"
  },
  {
    "name": "SRI SAI NARAYANA DEGREE COLLEGE"
  },
  {
    "name": "Sri Sai Prakash Degree College"
  },
  {
    "name": "Sri Sai Prasanthi Degree College, Kunavaram, Khammam"
  },
  {
    "name": "Sri Sai Raghavendra Degree College, Nizamabad (5029)"
  },
  {
    "name": "SRI SAI RAJESWARI B.Ed COLLEGE, LINGAPURAM, PRODDATUR,"
  },
  {
    "name": "SRI SAI RAJESWARI NURSING COLLEGE"
  },
  {
    "name": "Sri Sai Ram Degree College"
  },
  {
    "name": "Sri Sai Ram PG College, Nandikotkur"
  },
  {
    "name": "Sri Sai Siddhartha Degree College"
  },
  {
    "name": "SRI SAI SIRISHA DEGREE COLLEGE"
  },
  {
    "name": "Sri Sai Srinivasa Degree College, Kotarubilli Jn."
  },
  {
    "name": "SRI SAI TRIVENI DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "SRI SAI TRIVENI PG COLLEGE SURYAPET"
  },
  {
    "name": "SRI SAI VENKATESWARA DEGREE COLLEGE(094)GUDUR"
  },
  {
    "name": "Sri Sai Vidya Vikas Degree College"
  },
  {
    "name": "Sri Sai Vignan Bharathi Degree College for Women"
  },
  {
    "name": "SRI SAI VIKAS DEGREE COLLEGE"
  },
  {
    "name": "SRI SAI VIKAS DEGREE COLLEGE, KODAD"
  },
  {
    "name": "SRI SAI VYSHNAVI DEGREE COLLEGE"
  },
  {
    "name": "SRI SAI WOMENS DEGREE COLLEGE GUNTAKAL"
  },
  {
    "name": "sri sainatha degree college"
  },
  {
    "name": "Sri Sairam Degree College, Nandikotkur"
  },
  {
    "name": "SRI SAKETI SATYANARAYANA DEGREE COLLEGE"
  },
  {
    "name": "SRI SAMHITHA DEGREE COLLEGE"
  },
  {
    "name": "Sri Sankara's College of  Education, Kurnool"
  },
  {
    "name": "Sri Sankara's Degree College"
  },
  {
    "name": "Sri Sankara's Degree College (PG), Kurnool"
  },
  {
    "name": "SRI SANTOSH DEGREE COLLEGE, MOTKUR"
  },
  {
    "name": "Sri Sarada College of Nursing, Kadapa"
  },
  {
    "name": "Sri Sarada Degree  College for Women"
  },
  {
    "name": "SRI SARADA DEGREE COLLEGE"
  },
  {
    "name": "Sri Sarada Niketanam Oriental College"
  },
  {
    "name": "SRI SARASWATHI B ED COLLEGE "
  },
  {
    "name": "Sri Saraswathi College of Education, Tallur Village, Prakasam District"
  },
  {
    "name": "SRI SARASWATHI DEGREE COLLEGE THIRUMALAGIRI"
  },
  {
    "name": "SRI SARASWATHI DEGREE COLLEGE, RAJAPET"
  },
  {
    "name": "Sri Sarathi Institute of Engineering & Technology, Nuzvid"
  },
  {
    "name": "Sri Sarvodaya College, Nellore"
  },
  {
    "name": "Sri Sathya Sai Degree College"
  },
  {
    "name": "Sri Sathya Sai Degree College, Penukonda"
  },
  {
    "name": "Sri Sathya Sai Institute of Higher Learning"
  },
  {
    "name": "Sri Satya Sai Degree College"
  },
  {
    "name": "SRI SATYA SAI DEGREE COLLEGE, Palakonda"
  },
  {
    "name": "SRI SATYA SAI DEGREE COLLEGE-3100"
  },
  {
    "name": "SRI SATYAKRUPA DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "Sri Satyalaxmi College of Nursing, Hyderabad"
  },
  {
    "name": "SRI SATYASAI DEGREE OCLLEGE, DEVARAKONDA"
  },
  {
    "name": "Sri Seven Hills College of Nursing, Visakhapatnam"
  },
  {
    "name": "SRI SHIRDI SAI DEGREE COLLEGE"
  },
  {
    "name": "SRI SHIRIDI SAI DEGREE COLLEGE, JAMMALAMADUGU "
  },
  {
    "name": "Sri Shiridi Sai Degree College, Vizianagaram Dist."
  },
  {
    "name": "Sri Shiridi Sai Law College"
  },
  {
    "name": "SRI SHIRIDI SAI NARAYANA DEGREE COLLEGE"
  },
  {
    "name": "Sri Shiridi Sai Srinivasa Degree College"
  },
  {
    "name": "Sri Shiridi Sai Srinivasa Degree College, Chodavaram, Visakhapatnam"
  },
  {
    "name": "Sri Shiridi Sai Srinivasa Degree College, Sabbavaram"
  },
  {
    "name": "Sri Shiva Sai Degree College, Ieej"
  },
  {
    "name": "Sri Shivani College of Pharmacy,Warangal"
  },
  {
    "name": "SRI SHIVANI DEGREE COLLEGE,SIRCILLA"
  },
  {
    "name": "SRI SHIVANI INSTITUTE OF MANAGEMENT, GANAGADHARA,KARIMNAGAR"
  },
  {
    "name": "SRI SHRIDISAIRAM DEGREE COLLEGE, KALIGIRI"
  },
  {
    "name": "SRI SIDDHARTHA B.ED. COLLEGE"
  },
  {
    "name": "SRI SIDDHARTHA DEGREE COLLEGE FOR SCI.& COMPUTERS"
  },
  {
    "name": "SRI SIDDHARTHA DEGREE COLLEGE, MUNUGODE"
  },
  {
    "name": "SRI SIDDHARTHA PHARMACY COLLEGE"
  },
  {
    "name": "Sri Sidhartha Degree College, Bestavaripeta"
  },
  {
    "name": "SRI SITARAMA GOVERNMENT COLLAGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "SRI SITHA RAM COLLEGE OF NURSING"
  },
  {
    "name": "Sri Siva College of Nursing, Rayachoti"
  },
  {
    "name": "Sri Siva Sai Degree College, Kaluvoyi"
  },
  {
    "name": "Sri Siva Sai Degree College, Kothacheruvu"
  },
  {
    "name": "Sri Siva Teja B.Ed College, Cumbum,Prakasam, District"
  },
  {
    "name": "Sri Sivani College of Engineering, Chilakapalem Junction, Etcherla Mandal,  PIN-532402 (CC-W6)"
  },
  {
    "name": "Sri Sivani College of Pharmacy, N.H-5, Chilakapalem Jn., Etcherla (Mandal) Srikakulam-532485 (CC-DA)"
  },
  {
    "name": "SRI SIVANI DEGREE COLLEGE"
  },
  {
    "name": "SRI SNEHA DEGREE COLLEGE, BHONGIR"
  },
  {
    "name": "Sri Sreenivasa Degree  College, Somala Rural"
  },
  {
    "name": "SRI SRI GAYATHRI DEGREE COLLEGE, GHANPUR"
  },
  {
    "name": "Sri Srinivasa   Degree College, Punganur Rural"
  },
  {
    "name": "Sri Srinivasa Arts & Science College, Giddaluru"
  },
  {
    "name": "Sri Srinivasa College of Education, Plot No. 571, Darsi, Prakasam District"
  },
  {
    "name": "Sri Srinivasa Degree College"
  },
  {
    "name": "SRI SRINIVASA DEGREE COLLEGE"
  },
  {
    "name": "SRI SRINIVASA DEGREE COLLEGE"
  },
  {
    "name": "SRI SRINIVASA DEGREE COLLEGE"
  },
  {
    "name": "SRI SRINIVASA DEGREE COLLEGE"
  },
  {
    "name": "Sri Srinivasa Degree College , Chandragiri"
  },
  {
    "name": "Sri Srinivasa Degree College, Madanapalle Urban"
  },
  {
    "name": "SRI SRINIVASA DEGREE COLLEGE, VISSANNAPETA"
  },
  {
    "name": "SRI SUBBAIAH DEGREE COLLEGE "
  },
  {
    "name": "Sri Sunflower College of Engineering & Technology, Lankapalli (Challapalli), Ghantasala Mandal, -521131(CC-R8)"
  },
  {
    "name": "Sri Surya  Degree  College,      NAGARI Rural"
  },
  {
    "name": "Sri Surya College of Nursing, Hyderabad"
  },
  {
    "name": "SRI SURYA DEGREE COLLEGE"
  },
  {
    "name": "Sri Swamy Vivekananda B Ed College"
  },
  {
    "name": "Sri Swamy Vivekananda College of Education"
  },
  {
    "name": "Sri Tanguturi Prakasam Govt. Institute of Advanced Studies in Education, Santhapeta, Nellore"
  },
  {
    "name": "Sri Tatiparthi Venkata Reddy Memorial College of Education"
  },
  {
    "name": "SRI TIRUMALA COLLEGE OF NURSING "
  },
  {
    "name": "Sri TLN Degree College"
  },
  {
    "name": "Sri U. M. Govt. Degree College, Kondanagula"
  },
  {
    "name": "SRI UJWALA DEGREE COLLEGE(CO-EDUCATION), SURYAPET"
  },
  {
    "name": "Sri Uma Bharathi Degree College"
  },
  {
    "name": "SRI V.R.J.C. WOMENS DEGREE COLLEGE"
  },
  {
    "name": "SRI VAAGDEVI DEGREE COLLEGE"
  },
  {
    "name": "SRI VAAGDEVI DEGREE COLLEGE, HUZURABAD"
  },
  {
    "name": "Sri Vagdevi Degree College Phirangipuram"
  },
  {
    "name": "Sri Vaishnavi Degree College, Kadapa"
  },
  {
    "name": "Sri Vaishnavi Degree college, Rajampeta"
  },
  {
    "name": "Sri Vaishnavi Women's Degree College, Kamareddy (5046)"
  },
  {
    "name": "SRI VALLI SUBRAMANYESWARA COLLEGE OF EDUCATIION BANAGANAPALLE 349"
  },
  {
    "name": "Sri Vani Degree and PG College, Anantapur"
  },
  {
    "name": "SRI VANI Degree College PALAMANER Rural"
  },
  {
    "name": "Sri Vani Degree College, V.M. Banzar, Penubally"
  },
  {
    "name": "Sri Vani Degree College, Wanaparthy"
  },
  {
    "name": "Sri Vani Institute of Management & Science, Anantapur"
  },
  {
    "name": "Sri Vani School of Engineering, Chevuturu (V), G. Konduru Mandal, Pin- 521230(CC-7J)"
  },
  {
    "name": "Sri Varadaraja PG College"
  },
  {
    "name": " SRI VARI DEGREE COLLEGE"
  },
  {
    "name": "Sri Varupala Surya Rao Degree College"
  },
  {
    "name": "SRI VASAVI DEGREE and PG COLLEGE"
  },
  {
    "name": "SRI VASAVI DEGREE COLLEGE NAGARJUNA SAGAR"
  },
  {
    "name": "Sri Vasavi Degree College, Mahabubnagar"
  },
  {
    "name": "Sri Vasavi Engineering College, Pedatadepalli, Tadepalligudem, PIN-534101  (CC-A8)"
  },
  {
    "name": "SRI VASAVI GRANDHI MANIKYALA RAO B.Ed COLLEGE"
  },
  {
    "name": "Sri Vasavi Institute of Engineering & Technology, Nandamuru, Pedana Mandal,  PIN-521369(CC-MQ)"
  },
  {
    "name": "Sri Vasavi Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Sri Vasavi Vignana Mandali Degree College"
  },
  {
    "name": "Sri Vasista Degree College"
  },
  {
    "name": "SRI VEDANARAYANA DEGREE COLLEGE, ERIKAMBATTU, NARAYANAVANAM"
  },
  {
    "name": "Sri Vedavyasa Degree college"
  },
  {
    "name": "Sri Veerabadra Degree College, Koilkonda"
  },
  {
    "name": "Sri Vekateshwara Swamy College, Kadthal"
  },
  {
    "name": "SRI VELAGAPUDI RAMAKRISHNA DEGREE COLLEGE"
  },
  {
    "name": "Sri Vema Degree College, Naidupeta"
  },
  {
    "name": "Sri Venkata Padmavathi College of Nursing, Anantapur"
  },
  {
    "name": "Sri Venkata Padmavathi College of Nursing, Guntakal"
  },
  {
    "name": "SRI VENKATA RAMANA COLLEGE OF EDUCATION,GURAZALA"
  },
  {
    "name": "Sri Venkata Ramana Degree College"
  },
  {
    "name": "Sri Venkata Ramana Degree College, Vzm"
  },
  {
    "name": "Sri Venkata Sai College of Education (B.Ed), Plot No 104-1, Addanki, Prakasam District, 523201"
  },
  {
    "name": "SRI VENKATA SAI COLLEGE OF EDUCATION, KANDULAPURAM, CUMBUM, PRAKASAM DISTRICT"
  },
  {
    "name": "Sri Venkata Sai College of Medical Lab technology, Mahabubnagar"
  },
  {
    "name": "Sri Venkata Sai College of Nursing, Mahabubnagar"
  },
  {
    "name": "SRI VENKATA SAI DEGREE COLLEGE"
  },
  {
    "name": "SRI VENKATA SANDHYA COLLEGE OF EDUCATION"
  },
  {
    "name": "SRI VENKATA SRINIVASA DEGREE COLLEGE , MAKKUVA"
  },
  {
    "name": "Sri Venkatadri College of Nursing, Kadapa"
  },
  {
    "name": "Sri Venkatasai Degree College"
  },
  {
    "name": "Sri Venkatesa Perumal College of Engineering & Technology, Puttur"
  },
  {
    "name": "Sri Venkateshwara B.Ed College, Darsi"
  },
  {
    "name": "Sri Venkateshwara B.P.Ed College"
  },
  {
    "name": "SRI VENKATESHWARA COLLEGE OF ARCHITECTURE"
  },
  {
    "name": "SRI VENKATESHWARA COLLEGE OF EDUCATION"
  },
  {
    "name": "Sri Venkateshwara College of Education (Dubbak)"
  },
  {
    "name": "Sri Venkateshwara College of Education, Banswada (5294)"
  },
  {
    "name": "SRI VENKATESHWARA COLLEGE OF EDUCATION, KONDAMALLEPALLY"
  },
  {
    "name": "Sri Venkateshwara College of Fine Arts"
  },
  {
    "name": "Sri Venkateshwara College of Pharmacy"
  },
  {
    "name": "Sri Venkateshwara Commerce Degree College"
  },
  {
    "name": "SRI VENKATESHWARA DEGREE & PG COLLEGE, KODAD"
  },
  {
    "name": "SRI VENKATESHWARA DEGREE COLLEGE (PARGI)"
  },
  {
    "name": "SRI VENKATESHWARA DEGREE COLLEGE, ALAIR"
  },
  {
    "name": "Sri Venkateshwara Degree College, Bodhan (5051)"
  },
  {
    "name": "SRI VENKATESHWARA DEGREE COLLEGE, MAAL"
  },
  {
    "name": "SRI VENKATESHWARA DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "Sri Venkateshwara Government Arts & Science College"
  },
  {
    "name": "Sri Venkateswara & Sri Satyadev Degree College, Tenali"
  },
  {
    "name": "Sri Venkateswara Ayurvedic College, Tirupati"
  },
  {
    "name": "SRI VENKATESWARA College of  COMMERCE  TIRUPATI Urban"
  },
  {
    "name": "Sri Venkateswara College of Arts & Science"
  },
  {
    "name": "Sri Venkateswara college of Arts and Computer Sciences"
  },
  {
    "name": "Sri Venkateswara College of Arts and Computer sciences, Proddatur"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF EDUCATION"
  },
  {
    "name": "Sri Venkateswara College of Education"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF EDUCATION MUDDANUR"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF EDUCATION PENAMALURU"
  },
  {
    "name": "Sri Venkateswara College of Education, Bangarupalem"
  },
  {
    "name": "Sri Venkateswara College of Education, Darsi"
  },
  {
    "name": "Sri Venkateswara College of Education, Kollipara"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF ENGINEERING"
  },
  {
    "name": "Sri Venkateswara College of Engineering And Technology, Nh-5, Etcherla, PIN-532402 (CC-MT)"
  },
  {
    "name": "Sri Venkateswara College of Law. Tiruchanoor, Tirupati"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF NURSING CK PALEM ROAD ONGOLE PRAKASAM DISTRICT"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF NURSING, BRODIPET, GUNTUR"
  },
  {
    "name": "Sri Venkateswara College of Nursing, Kakinada"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF NURSING, KOLLIPARA, GUNTUR DISTRICT"
  },
  {
    "name": "Sri Venkateswara College of Nursing, Tirupati Road"
  },
  {
    "name": "Sri Venkateswara College Of Pharmacy"
  },
  {
    "name": "Sri Venkateswara College of Pharmacy, Chittoor"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF PHYSIOTHERAPY, ANANTAPURAMU"
  },
  {
    "name": "SRI VENKATESWARA COLLEGE OF PHYSIOTHERAPY, BRODIPET, GUNTUR"
  },
  {
    "name": "Sri Venkateswara Degree"
  },
  {
    "name": "Sri Venkateswara Degree College"
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE"
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE"
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE  NANDYAL"
  },
  {
    "name": "Sri Venkateswara Degree College Alur Kurnool(D)."
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE KADIRI "
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE MUNAGAPAKA"
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE PENAMALURU VIJAYAWADA"
  },
  {
    "name": "Sri Venkateswara Degree College, Anantapur"
  },
  {
    "name": "Sri Venkateswara Degree College, Chillakur"
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE, ETCHERLA"
  },
  {
    "name": "Sri Venkateswara Degree College, Guntakal"
  },
  {
    "name": "Sri Venkateswara Degree College, Guntur"
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE, GURRAMKONDA"
  },
  {
    "name": "Sri Venkateswara Degree College, Koilakuntla"
  },
  {
    "name": "Sri Venkateswara Degree College, Kollipara"
  },
  {
    "name": "Sri Venkateswara Degree College, Madakasira"
  },
  {
    "name": "Sri Venkateswara Degree College, Mudhanur"
  },
  {
    "name": "Sri Venkateswara Degree College, Nakirekallu"
  },
  {
    "name": "Sri Venkateswara Degree College, Nellore"
  },
  {
    "name": "SRI VENKATESWARA DEGREE COLLEGE, PONNUR"
  },
  {
    "name": "Sri Venkateswara Degree College, Porumamilla"
  },
  {
    "name": "Sri Venkateswara Degree College, Terlam, Vizianagaram Dist."
  },
  {
    "name": "Sri Venkateswara Degree College, Yadiki"
  },
  {
    "name": "Sri Venkateswara Degree college,BANAGANAPALLI "
  },
  {
    "name": "Sri Venkateswara Engineering College"
  },
  {
    "name": "SRI VENKATESWARA FISHERIES POLYTECHNIC"
  },
  {
    "name": "SRI VENKATESWARA FISHERIES POLYTECHNIC, TAKKOLU"
  },
  {
    "name": "Sri Venkateswara Government Degree College, Parvathipuram Manyam District"
  },
  {
    "name": "SRI VENKATESWARA HORTICULTURAL POLYTECHNIC"
  },
  {
    "name": "SRI VENKATESWARA HOTEL MANAGEMENT COLLEGE , PONNUR"
  },
  {
    "name": "Sri Venkateswara Institue of Technology & Sciences"
  },
  {
    "name": "SRI VENKATESWARA INSTITUTE OF MEDICAL LAB TECHNOLOGY"
  },
  {
    "name": "Sri Venkateswara Institute of Medical Sciences, Tirupathi"
  },
  {
    "name": "Sri Venkateswara Institute of Technology, Hampapuram,Anantapur"
  },
  {
    "name": "Sri Venkateswara Medical College, Tirupati"
  },
  {
    "name": "SRI VENKATESWARA PHARMACY COLLEGE, RVS NAGAR, CHITTOOR"
  },
  {
    "name": "Sri Venkateswara University, Tirupathy"
  },
  {
    "name": "Sri Venkateswara Vedic University, Tirpupathi"
  },
  {
    "name": "Sri Venkateswara Veterinary University, Tirupathi"
  },
  {
    "name": "Sri Venkateswara Vidya Peeth Degree College"
  },
  {
    "name": "Sri Venkhateswara DEGREE COLLEGE, Kotturu"
  },
  {
    "name": "SRI VIDYA  DEGREE COLLEGE"
  },
  {
    "name": "Sri Vidya  Degree College Nagari By-pass Road, Puttur"
  },
  {
    "name": "SRI VIDYA DEGREE COLLEGE"
  },
  {
    "name": "Sri VIdya Degree College"
  },
  {
    "name": "SRI VIDYA DEGREE COLLEGE"
  },
  {
    "name": "Sri Vidya Degree College"
  },
  {
    "name": "Sri Vidya Degree College (Co-Education)"
  },
  {
    "name": "Sri Vidya Degree College, Sundaraiah Nagar, Bandarugudem, Manuguru"
  },
  {
    "name": "Sri Vidya Institute of Management, Puttur"
  },
  {
    "name": "SRI VIDYA JYOTHI DEGREE COLLEGE SRI RAM NAGAR, JAGTIAL"
  },
  {
    "name": "SRI VIDYA SAI DEGREE COLLEGE        MADDIKERA"
  },
  {
    "name": "Sri Vidya vahini Degree College, Kasibugga"
  },
  {
    "name": "SRI VIDYABHARATI DEGREE COLLEGE, NALGONDA"
  },
  {
    "name": "Sri Vidyaniketan  College of Pharmacy,  Sri Sainath Nagar,A .Rangam pet Tirupathi"
  },
  {
    "name": "SRI VIDYANIKETAN DEGREE COLLEGE"
  },
  {
    "name": "SRI VIDYAVIKAS DEGREE COLLEGE"
  },
  {
    "name": "Sri Vignan Nursing Academy College, Kadiri"
  },
  {
    "name": "SRI VIGNANA BHARATHI DEGREE COLLEGE"
  },
  {
    "name": "Sri Vignyadeepthi Degree College, Chittoor(Rural)"
  },
  {
    "name": "Sri Vijaya Durga College of Nursing, Kadapa"
  },
  {
    "name": "Sri Vijaya Jyothi College of Nursing, Kadapa"
  },
  {
    "name": "Sri Vijaya Sai Degree College, Bodhan (5032)"
  },
  {
    "name": "Sri Vijayabharathi College of Education, Throvagunta, Ongole, Prakasam District"
  },
  {
    "name": "Sri Vijayadurga Degree College,"
  },
  {
    "name": "Sri Vijayanagar College of Law, Anantapur"
  },
  {
    "name": "SRI VIJAYANANDA DEGREE COLLEGE"
  },
  {
    "name": "SRI VIJAYANANDA DEGREE COLLEGE, Machilipatnam"
  },
  {
    "name": "Sri Vijetha Degree College, Chittor  Urban"
  },
  {
    "name": "Sri Vikas College of Nursing, Tirupati"
  },
  {
    "name": "SRI VIKAS DEGREE COLLEGE, JULURPAD"
  },
  {
    "name": "SRI VIKAS DEGREE COLLEGE, NEKKONDA"
  },
  {
    "name": "SRI VIKAS DEGREE COLLEGE, SINGARENI"
  },
  {
    "name": "Sri Vikasa Institute of Medical Sciences College of B.Sc MLT, Kadapa"
  },
  {
    "name": "Sri Vimalamandagiri Swamy Residentoial College for Women, Vyasasramam, Yerpedu"
  },
  {
    "name": "Sri Vinayaka Degree College, Sadum, Chittoor (Rural)"
  },
  {
    "name": "SRI VINAYAKA DEGREE COLLEGE, SURYAPETA"
  },
  {
    "name": "SRI VINAYAKA VENKATESWARA COLLEGE OF EDUCATION"
  },
  {
    "name": "Sri Vishweswara Sanskrit Andhra (SVSA) Kalasala, Station Road, Warangal (Oriental)"
  },
  {
    "name": "Sri Viswabharathi College of Education, Giddalur, Prakasam District"
  },
  {
    "name": "SRI VISWAJYOTHI DEGREE COLLEGE"
  },
  {
    "name": "Sri Visweswaraiah Institute of Technology & Science"
  },
  {
    "name": "SRI VIVEK DEGREE COLLEGE NUTHANKAL(4091)"
  },
  {
    "name": "SRI VIVEKA DEGREE COLLEGE, KANDUKUAR"
  },
  {
    "name": "Sri Vivekanada College of Education, Taluk"
  },
  {
    "name": "Sri Vivekanada Degree College"
  },
  {
    "name": "Sri Vivekananda   Degree College, Madanapalle Urban"
  },
  {
    "name": "Sri Vivekananda B.Ed College, Ramayanakandrika Village, Podili, Prakasam District, 523240"
  },
  {
    "name": "Sri Vivekananda B.P.Ed College, Ramayanakandrika Village, Madireddy Palem Village, Prakasam District"
  },
  {
    "name": "Sri Vivekananda College of Education, Mahabubabad"
  },
  {
    "name": "Sri Vivekananda College of Education, N.R.T Road, Vinukonda, Guntur District"
  },
  {
    "name": "SRI VIVEKANANDA COLLEGE OF NURSING, PODILI"
  },
  {
    "name": "Sri Vivekananda D.P.Ed College, Podili Village, Podili, Prakasam District"
  },
  {
    "name": "SRI VIVEKANANDA DEGREE COLLEGE"
  },
  {
    "name": "SRI VIVEKANANDA DEGREE COLLEGE"
  },
  {
    "name": "SRI VIVEKANANDA DEGREE COLLEGE"
  },
  {
    "name": "Sri Vivekananda Degree College"
  },
  {
    "name": "Sri Vivekananda Degree College"
  },
  {
    "name": "SRI VIVEKANANDA DEGREE COLLEGE"
  },
  {
    "name": "Sri Vivekananda Degree College"
  },
  {
    "name": "Sri Vivekananda Degree College, Dharmavaram"
  },
  {
    "name": "SRI VIVEKANANDA DEGREE COLLEGE, NELLIKUDURU"
  },
  {
    "name": "Sri Vivekananda Degree College, Podili"
  },
  {
    "name": "Sri Vivekananda Degree College, Vinjamur"
  },
  {
    "name": "SRI VIVEKANANDA DEGREE COLLEGE-BETAMCHERLA"
  },
  {
    "name": "Sri VSSC Govt. Degree College, Sullurpeta"
  },
  {
    "name": "SRI VYSHNAVI DEGREE COLLEGE, JAGTIAL"
  },
  {
    "name": "Sri Vyshnavi Degree College, Yemmiganur"
  },
  {
    "name": "SRI VYSHNAVI DEGREE COLLEGE,NANDIKOTKUR"
  },
  {
    "name": "Sri Y.K.R & K Government  Degree College, Kovur"
  },
  {
    "name": "SRI Y.N. COLLEGE"
  },
  {
    "name": "SRI Y.N. COLLEGE OF EDUCATION"
  },
  {
    "name": "SRI YUVA CHAITANYA DEGREE COLLEGE"
  },
  {
    "name": "Sri YVS and Sri BRM College of Physical Education"
  },
  {
    "name": "SRI. GCSR. DEGREE COLLEGE"
  },
  {
    "name": "Sri. R.K.M. Law College, Tirupati"
  },
  {
    "name": "SRI.C.DASS Arts & Science Degree  College,    SATHYAVEDU Rural"
  },
  {
    "name": "Sridevi Women's Engineering College"
  },
  {
    "name": "Sriji Degree College, Maddiralapadu"
  },
  {
    "name": "SRIKARA COLLEGE OF NURSING"
  },
  {
    "name": "Srinidhi Degree College"
  },
  {
    "name": "SRINIDHI DEGREE COLLEGE, DEVERAKONDA"
  },
  {
    "name": "SRINIDHI FISHERIES POLYTECHNIC COLLEGE"
  },
  {
    "name": "SRINIVASA COLLEGE OF EDUCATION"
  },
  {
    "name": "Srinivasa College of Education, Puttur"
  },
  {
    "name": "SRINIVASA DEGREE COLLEGE"
  },
  {
    "name": "Srinivasa Degree College (Medak)"
  },
  {
    "name": "Srinivasa Degree College (Narayankhed)"
  },
  {
    "name": "SRINIVASA DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "SRINIVASA DEGREE COLLEGE, JAMMALAMADUGU"
  },
  {
    "name": "Srinivasa Institue of Technology & Sciences"
  },
  {
    "name": "Srinivasa Institute of Engineering & Technology"
  },
  {
    "name": "SRINIVASA INSTITUTE OF MANAGEMENT"
  },
  {
    "name": "Srinivasa Institute of Management Studies ( SIMS )"
  },
  {
    "name": "Srinivasa Institute of Pharmaceutical Sciences, Proddutur"
  },
  {
    "name": "SRINIVASA RAMANUJAN INSTITUTE OF TECHNOLOGY"
  },
  {
    "name": "Srinivasa Rao College Of Pharmacy"
  },
  {
    "name": "SRIVANI DEGREE COLLEGE,  OLD JANDA, SULTANABAD"
  },
  {
    "name": "SRIVANI WOMENS DEGREE COLLEGE"
  },
  {
    "name": "SRIVENKATESHWARA DEGREE COLLEGE, KONDAMALLEPALLY"
  },
  {
    "name": "SRIVYSHNAVI DEGREE COLLEGE PATTIKONDA"
  },
  {
    "name": "SRK Commerce & Science College, Kamareddy (5054)"
  },
  {
    "name": "SRK Degree College,Cherial"
  },
  {
    "name": "SRK Institute of Technology, Enikepadu, Vijayawada-521108(CC-X4)"
  },
  {
    "name": "SRK Memorial College of Nursing, Mancherial"
  },
  {
    "name": "SRKR Engineering College"
  },
  {
    "name": "SRM DEGREE &PG COLLEGE, GEETHA BHAVAN CHOWRASTA, MUKARAMPURA, KARIMNAGAR"
  },
  {
    "name": "SRM DEGREE COLLEGE, SHAMSHABAD"
  },
  {
    "name": "SRM Institute of Medical Sciences & Technology, Karimnagar"
  },
  {
    "name": "SRM PG College(MBA)"
  },
  {
    "name": "SRM PG College(MCA)"
  },
  {
    "name": "SRM University-AP, Amaravati"
  },
  {
    "name": "SRNK Govt. Degree College, Banswada (5034)"
  },
  {
    "name": "SRR COLLEGE OF PHARMACEUTICAL SCIENCES, VALBHAPUR (V), ELKATURTHI (M), KARIMNAGAR"
  },
  {
    "name": "SRR GOVT. DEGREE COLLEGE, KARIMNAGAR"
  },
  {
    "name": "SRUJANA DEGREE COLLEGE, HALIA"
  },
  {
    "name": "Sruthi College of B.Sc Nursing, Guntur"
  },
  {
    "name": "SS AND N POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "SSB DEGREE COLLEGE FOR WOMEN YELESWRAM"
  },
  {
    "name": "SSJ College of Pharmacy"
  },
  {
    "name": "SSK DEGREE COLLEGE FOR WOMEN, DHOOLPET"
  },
  {
    "name": "SSK INSTITUTE OF BUSINESS MANAGEMENT, VONTIMITTA (V & M)"
  },
  {
    "name": "SSL Degree College, Banswada (5035)"
  },
  {
    "name": "SSR COLLAGE OF EDUCATTION"
  },
  {
    "name": "SSS Degree College"
  },
  {
    "name": "St .Anthony Degree College"
  },
  {
    "name": "ST ANNS COLLEGE OF NURSING, MALKAPURAM, VISAKHAPATNAM"
  },
  {
    "name": "St Anthony's Degree college for women"
  },
  {
    "name": "ST FRANCIS INSTITUTE OF MANAGEMENT STUDIES"
  },
  {
    "name": "ST JOHNS COLLEGE OF EDUCATION"
  },
  {
    "name": "St Joseph Degree College For Women"
  },
  {
    "name": "St Mari College of Education, Buchireddypalem"
  },
  {
    "name": "St Mark NTR College of Education, Narasaraopeta"
  },
  {
    "name": "ST MARYS CENTENARY COLLEGE OF MANAGEMENT"
  },
  {
    "name": "St Xavier Degree College"
  },
  {
    "name": "ST XAVIERS COLLEGE Jami"
  },
  {
    "name": "St. Agnes College of Education"
  },
  {
    "name": "St. Alphonsa College of Education"
  },
  {
    "name": "St. Ann's College of Engineering and Technology., Nayunipalli(V), Vetapalem(M), Chirala-523187,(CC-F0)"
  },
  {
    "name": "St. Ann's College of Nursing, Hanumakonda"
  },
  {
    "name": "St. Ann's College of Nursing, Vijayawada"
  },
  {
    "name": "St. Ann's College of Pharmacy, Nayunipalli(V), Vetapalem (M), Chirala - 523 187 (CC-DU)"
  },
  {
    "name": "St. Ann's P.G. College for Women (Mallapur)"
  },
  {
    "name": "St. Anns College for Women (Mehdipatnam)"
  },
  {
    "name": "St. Anns College for Women, Guntur"
  },
  {
    "name": "St. Anns College of Education"
  },
  {
    "name": "St. Anns College of Education, Venkatapuram (V), Mudigonda (M)"
  },
  {
    "name": "St. Anns College of Nursing, Guntur"
  },
  {
    "name": "St. Anns College Of Pharmacy"
  },
  {
    "name": "St. Anns Degree College for Women (Malkajgiri)"
  },
  {
    "name": "St. Anns Degree College for Women (Mallapur)"
  },
  {
    "name": "St. Augustien P.G College"
  },
  {
    "name": "St. Francis College for Women"
  },
  {
    "name": "ST. FRANCIS COLLEGE OF EDUCATION, SURYAPET"
  },
  {
    "name": "St. Francis Xavier Degree College"
  },
  {
    "name": "St. George Degree College for Women"
  },
  {
    "name": "St. Ignatious Degree College, Gurazala"
  },
  {
    "name": "St. John College of Education, Cumbum"
  },
  {
    "name": "St. John College of Nursing, Warangal"
  },
  {
    "name": "St. John Institute of Science & Technology"
  },
  {
    "name": "St. Johns College of Education"
  },
  {
    "name": "St. Johns College of Education"
  },
  {
    "name": "St. Johns College of Education, Eluru."
  },
  {
    "name": "St. Johns P.G. College"
  },
  {
    "name": "St. Joseph BEd College, Kurnool"
  },
  {
    "name": "St. Joseph College of Nursing, Eluru"
  },
  {
    "name": "ST. JOSEPH DEGREE COLLEGE, UPPARPALLI"
  },
  {
    "name": "St. Joseph Dental College, Euluru"
  },
  {
    "name": "St. Joseph s P.G. College, Rampoor, Warangal"
  },
  {
    "name": "St. Joseph's College for Women"
  },
  {
    "name": "St. Joseph's College of Education for Women"
  },
  {
    "name": "St. Joseph's College of Nursing, Dargametta"
  },
  {
    "name": "St. Joseph's College of Nursing, Guntur"
  },
  {
    "name": "St. Joseph's Degree & P.G. College"
  },
  {
    "name": "ST. JOSEPHS DEGREE COLLEGE (SHAIKPET)"
  },
  {
    "name": "ST. JOSEPHS DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "St. Judes College of Education"
  },
  {
    "name": "St. Lawrence College of Education, Arempula, Khammam"
  },
  {
    "name": "St. Lukes College of Nursing, Visakhapatnam"
  },
  {
    "name": "St. Marry College of Education, Mahabubnagar"
  },
  {
    "name": "St. Martin's Engineering College"
  },
  {
    "name": "St. Martins Institute of Business Management"
  },
  {
    "name": "St. Mary's College of Education (LingaReddyPally)"
  },
  {
    "name": "St. Mary's College of Pharmacy"
  },
  {
    "name": "St. Mary's College, (Yousufguda, Hyderabad-45)"
  },
  {
    "name": "St. Mary's Engineering College"
  },
  {
    "name": "St. Mary's Group of Institutions"
  },
  {
    "name": "St. Mary's Group of institutions Guntur, Chebrolu (V&M),  PIN-522212  (CC-BJ)"
  },
  {
    "name": "St. Mary's Women's Engineering College, Budumpadu, Guntur Rural, Guntur (Mandalam)  PIN-522013  (CC-ND)"
  },
  {
    "name": "St. Marys Centenary Degree College"
  },
  {
    "name": "St. Marys College for PG Courses"
  },
  {
    "name": "St. Marys College of Education (Secunderabad)"
  },
  {
    "name": "St. Marys College of Education, Cheepurupalli, Vizianagaram"
  },
  {
    "name": "St. Marys Colleges of B.Pharmacy, A.D.B. Road, Surampalem, Anuru (P), Peddapuram Revenue Division,Pin-533437(CC-8Q)"
  },
  {
    "name": "St. Marys Degree College, Bucchireddypalem"
  },
  {
    "name": "St. MARYS NIRMALA HRUDAYA MAHILA COLLEGE"
  },
  {
    "name": "St. Patricks Degree & P.G College"
  },
  {
    "name": "St. Paul College of Education"
  },
  {
    "name": "St. Paul's College of Education"
  },
  {
    "name": "St. Paul's College of Management & Information Technology"
  },
  {
    "name": "St. Pauls College of Pharmacy"
  },
  {
    "name": "St. Pauls Degree College"
  },
  {
    "name": "St. Peter s College of Education, Vidyanagar, Hanamkonda"
  },
  {
    "name": "St. Peter s Institute of Pharmaceutical Sciences, Vidyanagar, Hanamkonda"
  },
  {
    "name": "St. Peter's Engineering College"
  },
  {
    "name": "St. Pious X Degree and P.G College for Women"
  },
  {
    "name": "St. Pious X P.G (M.B.A) College for Women"
  },
  {
    "name": "St. Thomas College of Education"
  },
  {
    "name": "St. Thomas College of Education, Bodhan (5289)"
  },
  {
    "name": "St. Vincent De-Paul College"
  },
  {
    "name": "St. Vincent P.G. College"
  },
  {
    "name": "St. Xavier Institute of Pharmacy, Phirangipuram"
  },
  {
    "name": "St. Xaviers P.G. College (Gopanpally)"
  },
  {
    "name": "St.Ann's College for Women"
  },
  {
    "name": "St.GREGORY B.Ed COLLEGE, Vetapalem"
  },
  {
    "name": "St.John\u0092s College of Engineering & Technology, Yemmiganur"
  },
  {
    "name": "St.John\u0092s College of Pharmaceutical Sciences, Yemmiganur"
  },
  {
    "name": "St.Joseph's Degree  College for Women, Kurnool"
  },
  {
    "name": "St.Joseph's Degree College"
  },
  {
    "name": "St.Marys Integrated Campus Hyderabad"
  },
  {
    "name": "St.Marys PG College, Buchireddipalem"
  },
  {
    "name": "St.Peters College of Education, Adoni"
  },
  {
    "name": "ST.Peters College of Education, Pathikonda"
  },
  {
    "name": "STANFORD COLLEGE OF EDUCATION, HANUMAPUR"
  },
  {
    "name": "STANFORD PG COLLEGE, BHONGIR"
  },
  {
    "name": "STANFORD WOMENS DEGREE COLLEGE, BHONGIR"
  },
  {
    "name": "Stanley College of Engineering & Technology for Women"
  },
  {
    "name": "Stanley Degree And P.G College for Women"
  },
  {
    "name": "STBC College,"
  },
  {
    "name": "SUBRAHMANYAM ANANTHALAKSHMI COLLEGE OF NURSING"
  },
  {
    "name": "SUCCESS DEGREE COLLEGE"
  },
  {
    "name": "Success Degree College of Commerce and Science, HB Colony, Armoor, Nizamabad (5071)"
  },
  {
    "name": "SUGUNA DEGREE COLLEGE"
  },
  {
    "name": "SUGUNA DEGREE COLLEGE, KODAD"
  },
  {
    "name": "SUJATHA COLLEGE OF NURSING"
  },
  {
    "name": "Sujatha Degree College for Women"
  },
  {
    "name": "Sultan Ul Uloom College of  Pharmacy"
  },
  {
    "name": "Sultan-Ul-Uloom Law College"
  },
  {
    "name": "Suma College of Nursing, Nellore"
  },
  {
    "name": "Sumathi Reddy Institute of Technology For Women"
  },
  {
    "name": "SUMOURYA DEGREE COLLEGE"
  },
  {
    "name": "Sumourya Institute of Management"
  },
  {
    "name": "SUN DEGREE COLLEGE"
  },
  {
    "name": "SUN DEGREE COLLEGE"
  },
  {
    "name": "Sun Institute of Hotel Management and Catering Technology"
  },
  {
    "name": "SUN INSTITUTE OF HOTEL MANAGEMENT AND CATERING TECHNOLOGY"
  },
  {
    "name": "Sun Institute of Pharmaceutical Education & Research"
  },
  {
    "name": "SUN INSTITUTE OF PHYSIOTHERAPY REHABILITATION, KAKUPALLI, NELLORE"
  },
  {
    "name": "SUN PRIDE DEGREE COLLEGE"
  },
  {
    "name": "SUN PRIDE INSTITUTE OF HOTEL MANAGEMENT AND CATERING TECHNOLOGY"
  },
  {
    "name": "SUN SENORA BEACH CAMPUS"
  },
  {
    "name": "SUNFLOWER DEGREE COLLEGE"
  },
  {
    "name": "Suprabhat Institute of Computer Studies"
  },
  {
    "name": "Suprabhat Institute of Management Studies"
  },
  {
    "name": "SUPRABHATH P G COLLEGE, RAGHAVAPUR"
  },
  {
    "name": "SURABHI COLLEGE OF NURSING"
  },
  {
    "name": "SURABHI COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Surabhi Dayakar Rao College of Pharmacy"
  },
  {
    "name": "SURABHI INSTITUTE OF ALLIED HEALTH SCIENCES"
  },
  {
    "name": "SURABHI INSTITUTE OF MEDICAL SCIENCES"
  },
  {
    "name": "SURYA COLLEGE OF EDUCATION, Vill&Post: Nukapally  Mond: Malyala, JAGTIAL"
  },
  {
    "name": "SURYA DEGREE COLLEGE"
  },
  {
    "name": "SURYA DEGREE COLLEGE CHANDRUGOUNDA"
  },
  {
    "name": "SURYA TEJA DEGREE COLLEGE"
  },
  {
    "name": "Suryaraya Degree College"
  },
  {
    "name": "Susheela College of Education, Madhira"
  },
  {
    "name": "Susheela Memorial Degree College, Didugupadu (V), Madhira"
  },
  {
    "name": "Susruta Institute of Physical Medicine and Rehabilitation, Hyderabad"
  },
  {
    "name": "SUVIDYA DEGREE COLLEGE, CHITYAL"
  },
  {
    "name": "SV (Sri Vagdevi) Degree College, Nizamabad (5031)"
  },
  {
    "name": "SV DEGREE COLLEGE"
  },
  {
    "name": "SV Degree College, Pitlam (5052)"
  },
  {
    "name": "SV.Oriental. College, Tirupati Urban"
  },
  {
    "name": "SVB Govt. Degree College"
  },
  {
    "name": "SVCR Government Degree College, Palamaner   Rural"
  },
  {
    "name": "SVKP & Dr. K.S. Raju Arts &Science College"
  },
  {
    "name": "SVR College of Education, Madhira"
  },
  {
    "name": "SVR COLLEGE OF NURSING"
  },
  {
    "name": "SVR Degree College, MGM Complex, Macherla, Guntur District"
  },
  {
    "name": "SVR Engineering College, Nandyal"
  },
  {
    "name": "SVS DEGREE AND PG COLLEGE "
  },
  {
    "name": "SVS Group of Institutions"
  },
  {
    "name": "SVS Institute of Dental Sciences, Mahabubnagar"
  },
  {
    "name": "SVS INSTITUTE OF PARAMEDICAL SCIENCES "
  },
  {
    "name": "SVS Medical College, Mahabubnagar"
  },
  {
    "name": "SVSRM College of Education "
  },
  {
    "name": "SVU College of Pharmaceutical Sciences"
  },
  {
    "name": "SVU IASE, Tirupati (Constituent College)"
  },
  {
    "name": "SVVP V.M.C Mahila Vidya Peeth Degree College for Women"
  },
  {
    "name": "SVVVS College"
  },
  {
    "name": "Swami Ramananda Thirtha Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Swami Vivekananda Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Swami Vivekananda Institute of Technology"
  },
  {
    "name": "Swamy Vivekananda College of Education, Kalyandurg"
  },
  {
    "name": "Swamy Vivekananda Degree & P.G College, MBNR"
  },
  {
    "name": "SWAMY VIVEKANANDA DEGREE COLLEGE, AKUTHOTAPALLI, ANANTAPURAMU"
  },
  {
    "name": "Swamy Vivekananda Degree College, Kalyuandurg"
  },
  {
    "name": "SWAMY VIVEKANANDA DEGREE COLLEGE, NEAR BUS STAND, DHARMARAM"
  },
  {
    "name": "Swarna Bharathi Degree College, Ichapuram"
  },
  {
    "name": "Swarna Bharathi Institute of Science and Technology"
  },
  {
    "name": "Swarnandhra Bharathi Degree College, Gudur"
  },
  {
    "name": "Swarnandhra College of Engineering & Technology, Narasapur. PIN -534275  (CC-A2)"
  },
  {
    "name": "Swarnanjali College of Nursing, Khammam"
  },
  {
    "name": "Swatantra College of Nursing, Rajahmundry"
  },
  {
    "name": "Swatantra Inst. of Physiotherapy & Rehabilitation, Rajahmundry"
  },
  {
    "name": "SWATHI COLLEGE OF NURSING"
  },
  {
    "name": "Swathi College of Pharmacy"
  },
  {
    "name": "SWATHI COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Swathi Degree College"
  },
  {
    "name": "Swathi Institute of Technology & Science"
  },
  {
    "name": "Swayamkrushi Self Reliance for the Mentally Challenged"
  },
  {
    "name": "Sweekar Academy of Rehabilitation Sciences, Secunderabad"
  },
  {
    "name": "Swetha Degree College, # 7-90, 7-91/1, Near Bus Stand, Chennur"
  },
  {
    "name": "SYAMALAKRISHNA POLYTECHNIC OF AGRICULTURAL ENGINEERING"
  },
  {
    "name": "SYAMALAKRISHNA POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "SYAMALAKRISHNA POLYTECHNIC OF SEED TECHNOLOGY"
  },
  {
    "name": "SYED JAMAL MEMORIAL COLLEGE OF EDUCATION, KODAD"
  },
  {
    "name": "SYMBIOSIS CENTRE FOR MANAGEMENT STUDIES, HYDERABAD"
  },
  {
    "name": "SYMBIOSIS Institute of Business Management, Hyderabad"
  },
  {
    "name": "SYMBIOSIS INSTITUTE OF TECHNOLOGY, HYDERABAD"
  },
  {
    "name": "SYMBIOSIS Law School, Hyderabad"
  },
  {
    "name": "SYNERGY DEGREE COLLEGE, MAINAPALLY"
  },
  {
    "name": "Syo Narayan Ramcharan Patwari P.G College of Commerce"
  },
  {
    "name": "SYSTEM DEGREE COLLEGE"
  },
  {
    "name": "T.H.P Institute of Research & Rehabilitation for the Mentally Handicapped"
  },
  {
    "name": "T.J.P.S. College"
  },
  {
    "name": "T.R.R. & S. Degree College, Piduguralla"
  },
  {
    "name": "T.R.R. Govt. Degree College, Kandukuru"
  },
  {
    "name": "T.S.R  & E.R.R.GOVT. DEGREE COLLEGE"
  },
  {
    "name": "T.S.R. Degree College,Amadalavalasa"
  },
  {
    "name": "Tadipatri Engineering College,  Tadipatri"
  },
  {
    "name": "Tagore College of Education, Kodumur"
  },
  {
    "name": "Takshashila Degree College"
  },
  {
    "name": "Takshashila Degree College, Kesamudram"
  },
  {
    "name": "Talla Padmavathi College of Engineering"
  },
  {
    "name": "TALLA PADMAVATHI COLLEGE OF PHARMACY"
  },
  {
    "name": "Talla Padmavathi Pharmacy College"
  },
  {
    "name": "TANVI COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "TAPASAYA DEGREE COLLEGE  CHAITANYAPURI"
  },
  {
    "name": "TAPASYA DEGREE COLLEGE KUKATPALLY"
  },
  {
    "name": "TAPASYA DEGREE COLLEGE LAKDIKAPOOL"
  },
  {
    "name": "TAPASYA DEGREE COLLEGE NARAYANGUDA"
  },
  {
    "name": "TAPASYA DEGREE COLLEGE SECUNDEABAD"
  },
  {
    "name": "TARA Govt. College (A)"
  },
  {
    "name": "TARAKARAM BED COLLEGE"
  },
  {
    "name": "Tarlapadu College of Education, Tarlapadu"
  },
  {
    "name": "Tata Institute of Social Sciences"
  },
  {
    "name": "Teegala Krishna Reddy College of Pharmacy"
  },
  {
    "name": "Teegala Krishna Reddy Engineering College"
  },
  {
    "name": "Teegala Ram Reddy College of Pharmacy"
  },
  {
    "name": "Teja College of Pharmacy"
  },
  {
    "name": "Telangan Social Welfare Residential College for Women, Nizamabad (5078)"
  },
  {
    "name": "Telangana Saraswatha Parishath Oriental College"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENCIAL DEGREE COLLEGE WOMEN ADILABAD"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL ARMED FORCES PREPARATORY DEGREE COLLEGE FOR WOMEN BHONGIR"
  },
  {
    "name": "Telangana Social Welfare Residential Degree & PG College , Mahendrahills"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE AND PG COLLEGE FOR WOMEN BUDVEL"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE  FOR WOMEN, Budhera, Munipally Mandal, Sangareddy Dist"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE (GIRLS) MAHABUBABAD"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE (WOMEN)"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Women"
  },
  {
    "name": "Telangana social Welfare Residential Degree College for Women - Bhupalpally, Jayashankar Bhupalpally Dist."
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Women - Nalgonda"
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Women Jagathgirigutta"
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Women LBNagar"
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Women Medak"
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Women Siddipet"
  },
  {
    "name": "Telangana Social welfare Residential Degree College for Women Suryapet"
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Women Vikarabad"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN, JAGITIAL"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN, KARIMNAGAR"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN, KOTHAGUDEM"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN, MANCHERIAL"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN, SIRCILLA"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN, WANAPARTHY."
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Women,Mahabubnagar"
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Womens (Girls), Kamareddy (5077)"
  },
  {
    "name": "Telangana Social Welfare Residential Degree College for Womens, Armoor (5079)"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL DEGREE PHARMACY COLLEGE"
  },
  {
    "name": "TELANGANA SOCIAL WELFARE RESIDENTIAL LAW COLLEGE FOR WOMEN"
  },
  {
    "name": "TELANGANA SOCIAL WELFERE RESIDENTIAL DEGREE COLLEGE (WOMEN) "
  },
  {
    "name": "TELANGANA TRIBAL WELFARE DEGREE COLLEGE FOR WOMAN SHADNAGAR"
  },
  {
    "name": "Telangana Tribal Welfare Degree college(Men) Nagarkurnool at Achampet"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE (BOYS), MANUGURU, BHADRADRI KOTHAGUDEM DISTRICT"
  },
  {
    "name": " Telangana Tribal Welfare Residential Degree College (Girls)"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE (GIRLS) ASIFABAD - 640"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE (GIRLS), KHAMMAM"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE (GIRLS), KOTHAGUDEM"
  },
  {
    "name": "Telangana Tribal Welfare Residential Degree College (Men), Sangareddy"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR BOYS KARIMNAGAR"
  },
  {
    "name": "Telangana Tribal Welfare Residential Degree College for Men"
  },
  {
    "name": "Telangana Tribal Welfare Residential Degree College for MEN, Kamareddy (5080)"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMAN"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN DEVARAKONDA"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN SURYAPET"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN, MAHABUBNAGAR"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN, SIRCILLA"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE FOR WOMEN,MEDAK"
  },
  {
    "name": "Telangana Tribal Welfare Residential Degree College of Life Sciences for Womens, Nizamabad (5081)"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE(BOYS), BOATH AT ADILABAD"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGE(GIRLS), JANGAON"
  },
  {
    "name": "Telangana Tribal Welfare Residential Degree College(Girls)-Mulugu"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL DEGREE COLLEGES (GIRLS) MAHABUBABAD"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIAL LAW COLLEGE FOR MEN"
  },
  {
    "name": "TELANGANA TRIBAL WELFARE RESIDENTIALDEGREE COLLEGE (BOYS)MARIPEDA  MAHABUBABAD DIST"
  },
  {
    "name": "Telangana University, Nizamabad"
  },
  {
    "name": "THAMMI NAIDU DEGREE COLLEGE"
  },
  {
    "name": "THAMMI NAIDU VIDYA DEGREE COLLEGE"
  },
  {
    "name": "THANUJA MEMORIAL DEGREE COLLEGE"
  },
  {
    "name": "Thapasvi Degree College, Kubeer (V&M)"
  },
  {
    "name": "The Adoni Arts & Science College,"
  },
  {
    "name": "The Amalapuram Degree College"
  },
  {
    "name": "The Apollo University"
  },
  {
    "name": "The Crescents College of Business Management, Janpak, Geesugonda Mandal, Warangal"
  },
  {
    "name": "The English and Foreign Languages University, Hyderabad"
  },
  {
    "name": "THE HINDU COLLEGE"
  },
  {
    "name": "THE HINDU COLLEGE - MBA"
  },
  {
    "name": "The Lakshmi Venkatesh T.G Physiotheraphy College, Kurnool"
  },
  {
    "name": "The Mothers Degree College for Women"
  },
  {
    "name": "THE PROGRESS DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "Thirumala College of Medical Lab Technology, Nizamabad"
  },
  {
    "name": "Thirumala College of Nursing, Armoor"
  },
  {
    "name": "Thirumala college of Pharmacy"
  },
  {
    "name": "Thirumala College of Physiotherapy, Nizamabad"
  },
  {
    "name": "Thotakura RamaKotaiah College of Education"
  },
  {
    "name": "THRINAI COLLEGE OF PHARMACY"
  },
  {
    "name": "Tiruamala College of Nursing, Vizianagaram"
  },
  {
    "name": "Tirumala Engineering College"
  },
  {
    "name": "Tirumala Engineering College, Jonnalagadda(Post), Narasaraopet, PIN-522601(CC-NE)"
  },
  {
    "name": "TIRUMALA INSTITUTE OF DENTAL SCIENCES  AND RESEARCH CENTRE"
  },
  {
    "name": "Tirupathi Institute of Education, Vizianagaram"
  },
  {
    "name": "Tiyyagura Sitarami Reddy Degree College, Piduguralla"
  },
  {
    "name": "TKR College of Engineering & Technology"
  },
  {
    "name": "TKR Institute of Management & Science"
  },
  {
    "name": "TMSS College of Management"
  },
  {
    "name": "Trendz Degree College"
  },
  {
    "name": "Trinity College Of Education"
  },
  {
    "name": "TRINITY COLLEGE OF EDUCATION"
  },
  {
    "name": "TRINITY COLLEGE OF EDUCATION,  PEDDAPALLY"
  },
  {
    "name": "TRINITY COLLEGE OF EDUCATION, KASULAPALLY, PEDDAPALLY"
  },
  {
    "name": "TRINITY COLLEGE OF EDUCATION, STATION ROAD, PEDDAPALLY"
  },
  {
    "name": "Trinity College of Engineering & Technology"
  },
  {
    "name": "TRINITY COLLEGE OF ENGINEERING AND TECHNOLOGY"
  },
  {
    "name": "TRINITY COLLEGE OF HOTEL MANAGEMENT, TARNAKA"
  },
  {
    "name": "TRINITY COLLEGE OF PHARMACEUTICAL SCIENCES, PRAGATHINAGAR, PEDDAPALLY, KARIMNAGAR"
  },
  {
    "name": "TRINITY DEGREE COLLEGE"
  },
  {
    "name": "TRINITY DEGREE COLLEGE   SULTANABAD"
  },
  {
    "name": "TRINITY DEGREE COLLEGE JYOTHI NAGAR, NTPC, RAMAGUNDAM"
  },
  {
    "name": "TRINITY DEGREE COLLEGE, PRAGATHI NAGAR, PEDDAPALLY"
  },
  {
    "name": "TRIVENI ARTS & SCIENCE DEGREE COLLEGE, KODAD"
  },
  {
    "name": "TRIVENI DEGREE COLLEGE"
  },
  {
    "name": "Triveni Degree College, Achampet"
  },
  {
    "name": "TRIVENI MAHILA DEGREE COLLEGE"
  },
  {
    "name": "TRR College of Engineering"
  },
  {
    "name": "TRR INSTITUTE OF MEDICAL SCIENCES"
  },
  {
    "name": "TSR & TBK Degree College"
  },
  {
    "name": "TSR BSC COLLEGE OF NURSING"
  },
  {
    "name": "TSRTC COLLEGE OF NURSING"
  },
  {
    "name": "TSWR DEGREE & PG COLLEGE FOR WOMEN, IBRAHIMPATNAM "
  },
  {
    "name": "TSWR Degree College for Women, Warangal West"
  },
  {
    "name": "TTWRDC(GIRLS) Dammapeta At Ankampalem"
  },
  {
    "name": "TULASI COLLEGE OF NURSING"
  },
  {
    "name": "Uday Degree College"
  },
  {
    "name": "UJWALA DEGREE COLLEGE, VALIGONDA"
  },
  {
    "name": "UK College of Education"
  },
  {
    "name": "Unique Degree College for Women"
  },
  {
    "name": "UNITY COLLEGE OF PHARMACY, RAIGIR"
  },
  {
    "name": "Unity Degree College "
  },
  {
    "name": "UNITY PG COLLEGE, RAIGIR"
  },
  {
    "name": "Universal Christian College of Education, Indukurupet, GNT RoadNear RTC Bus Stand, Nellore- 524 003"
  },
  {
    "name": "Universal College of Engineering & Technology, Dokiparru(V), Medikondur(M),PIN-522438  (CC-NF)"
  },
  {
    "name": "UNIVERSAL DEGREE COLLEGE, YERRAGONDLAPALEM"
  },
  {
    "name": "University Arts and Science College, Kakatiya University"
  },
  {
    "name": "UNIVERSITY COLLEG OF TECHNOLOGY AUTONOMOUS OSMANIA UNIVERSITY"
  },
  {
    "name": "University College for Women Subedari"
  },
  {
    "name": "University College for Women, Koti"
  },
  {
    "name": "University College of  Science, Saifabad"
  },
  {
    "name": "University College of Arts and Commerce"
  },
  {
    "name": "UNIVERSITY COLLEGE OF ARTS AND SOCIAL SCIENCES"
  },
  {
    "name": "University College of Arts, Commerce and Law"
  },
  {
    "name": "UNIVERSITY COLLEGE OF COMMERCE BUSINESS MANAGEMENT OSMANIA UNIVERSITY"
  },
  {
    "name": "university college of education"
  },
  {
    "name": "University College of Education"
  },
  {
    "name": "University College of Engineering"
  },
  {
    "name": "University College of Engineering & Technology"
  },
  {
    "name": "University College of Engineering & Technology  for Women"
  },
  {
    "name": " University College of Engineering JNTUK Narasaraopet"
  },
  {
    "name": "University College of Engineering Osmania University Hyderabad"
  },
  {
    "name": "University College of Engineering, Kakinada (AUTONOMOUS)"
  },
  {
    "name": "University College of Engineering, Vizianagaram"
  },
  {
    "name": "University college of Engineering,Kothagudam"
  },
  {
    "name": "UNIVERSITY COLLEGE OF MANAGEMENT HYDERABAD"
  },
  {
    "name": "University College of Pharmaceutical Sciences"
  },
  {
    "name": "UNIVERSITY COLLEGE OF PHARMACEUTICAL SCIENCES KAKATIYA UNIVERSITY"
  },
  {
    "name": "University College of Physical Education and Sports Sciences"
  },
  {
    "name": "University College of Science and Technology"
  },
  {
    "name": "UNIVERSITY COLLEGE OF SCIENCE OSMANIA UNIVERSITY"
  },
  {
    "name": "University Collge of Architecture & Planning"
  },
  {
    "name": "University Collge of Sciences"
  },
  {
    "name": "University Law college"
  },
  {
    "name": "University of Hyderabad, Hyderabad"
  },
  {
    "name": "UNIVERSITY P G CENTER GADWAL"
  },
  {
    "name": "UNIVERSITY PG COLLEGE, BHUPALAPALLY"
  },
  {
    "name": "UNIVERSITY PG COLLEGE, MAHABUBABAD"
  },
  {
    "name": "Urdu Arts College (Eve)"
  },
  {
    "name": "Usha Rama College of Engineering & Technology,NH-5, Telaprolu, Near Gannavaram, Unguturu mandal, PIN- 521109.(CC-NG)"
  },
  {
    "name": "USHA SRI DEGREE COLLEGE  KUKUNOOR"
  },
  {
    "name": "Ushasri Degree College, Kallauru (V&M)"
  },
  {
    "name": "Ushodaya College Of Education"
  },
  {
    "name": "Ushodaya College of Education, Wanaparthy"
  },
  {
    "name": "Ushodaya College of Education, Yemmiganur"
  },
  {
    "name": "Ushodaya Degree College"
  },
  {
    "name": "Ushodaya Degree College, Bangarupalem"
  },
  {
    "name": "Ushodaya Degree College, Bodhan (5049)"
  },
  {
    "name": "Ushodaya Mahila Degree College, Bodhan (5039)"
  },
  {
    "name": "V D A Degree College"
  },
  {
    "name": "V S M COLLEGE PG COURSES"
  },
  {
    "name": "V.C.R Degree  College,  Mittoor Urban"
  },
  {
    "name": "V.Js. College Of Pharmacy"
  },
  {
    "name": "V.K.R COLLEGE"
  },
  {
    "name": "V.K.V.Govt.Degree College"
  },
  {
    "name": "V.R Institute of Post Graduate Studies,Nellore."
  },
  {
    "name": "V.R. Institute of PG Studies, Nellore"
  },
  {
    "name": "V.R.Law College, Nellore"
  },
  {
    "name": "V.R.S. & Y.R.N. College, Chirala"
  },
  {
    "name": "V.S.K. DEGREE COLLEGE"
  },
  {
    "name": "V.S.Lakshmi Degree College for Women"
  },
  {
    "name": "V.S.M. College of Engineering"
  },
  {
    "name": "V.S.M.College"
  },
  {
    "name": "V.S.R. & A.M. Degree College, Martur"
  },
  {
    "name": "V.S.R. & N.V.R. College, Tenali"
  },
  {
    "name": "V.S.R. GOVT. DEGREE & PG COLLEGE"
  },
  {
    "name": "V.S.R.Rural Degree College"
  },
  {
    "name": "V.T.J.M. & I.V.T.R. Degree College, Mangalagiri"
  },
  {
    "name": "V.V. & M. College, Ongole"
  },
  {
    "name": "V.V. College (AN)"
  },
  {
    "name": "V.V. College (Day)"
  },
  {
    "name": "V.V. GIRI GOVT. KALASALA"
  },
  {
    "name": "V.V.S. Degree College, U.Kothapalli"
  },
  {
    "name": "Vaagdevi College of Education, Parkal"
  },
  {
    "name": "Vaagdevi College of Engineering"
  },
  {
    "name": "Vaagdevi College of Engineering, Bollikuknta, Warangal"
  },
  {
    "name": "Vaagdevi College of Pharmacy, Ramnagar, Hanamkonda, Warangal"
  },
  {
    "name": "VAAGDEVI COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "Vaagdevi College of Physiotheraphy, Warangal"
  },
  {
    "name": "Vaagdevi Degree & PG College, Kishanpura, Hanamkonda"
  },
  {
    "name": "Vaagdevi Degree College,  13-21, Thimmapur Area, Khanapur (V&M)"
  },
  {
    "name": "Vaagdevi Degree College, 47&54, Boath (P&M)"
  },
  {
    "name": "Vaagdevi Degree College, Kishanpura, Hanamkonda"
  },
  {
    "name": "Vaagdevi Degree College, Nizamabad (5038)"
  },
  {
    "name": "VAAGDEVI DEGREE COLLLEGE, MANCHERIAL"
  },
  {
    "name": "Vaagdevi Engineering College"
  },
  {
    "name": "Vaagdevi Institute of Management Sciences, Bollikunta, Warangal (PG)"
  },
  {
    "name": "Vaagdevi Institute of Pharmaceutical Sciences, Bollikunta, Warangal"
  },
  {
    "name": "Vaagdevi Institute of Technology & Science, Proddatur"
  },
  {
    "name": "Vaagdevi Pharmacy College"
  },
  {
    "name": "VAAGDEVI WOMENs DEGREE COLLEGE, DEVARAKONDA"
  },
  {
    "name": "VAAGESWARI COLLEGE OF PHARMACY, BESIDE LMD POLICE STATION, THIMMAPUR, KARIMNAGAR"
  },
  {
    "name": "VAAGESWARI DEGREE COLLEGE MUKARAMPURA ROAD, KARIMNAGAR"
  },
  {
    "name": "Vaageswari Institute of Management Sciences"
  },
  {
    "name": "Vaasavi Degree College, H.No. 5-51,Pulluri Ramaiah Palli,Bhupalpally506 168"
  },
  {
    "name": "Vagdevi Arts & Science Degree College,  4-3-41, Opp. New Bus Stand, Bhuktapur, Adilabad"
  },
  {
    "name": "Vagdevi College of Pharmacy & Research Centre"
  },
  {
    "name": "Vagdevi College of Pharmacy, Gurazala"
  },
  {
    "name": "VAGDEVI DEGREE COLLEGE"
  },
  {
    "name": "Vagdevi Degree College"
  },
  {
    "name": "VAGDEVI DEGREE COLLEGE FOR WOMEN'S"
  },
  {
    "name": "VAGDEVI DEGREE COLLEGE, KORUTLA ROAD, BESIDE AMC, VEMULAWADA"
  },
  {
    "name": "Vagdevi Degree College, Narsaraopeta"
  },
  {
    "name": "Vageswari College of Engineering"
  },
  {
    "name": "Vageswari Institute of Pharmaceutical Sciences"
  },
  {
    "name": "VAGHESHWARI DEGREE COLLEGE, UTHKOOR, LUXETTIPET"
  },
  {
    "name": "Vaibhav College of Higher Learning, Koilakuntla"
  },
  {
    "name": "VAINAVI COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "Vaishnavi College of Arts and Science"
  },
  {
    "name": "VAISHNAVI DEGREE COLLEGE, KORUTLA ROAD, VEMULAWADA"
  },
  {
    "name": "VAISHNAVI SCHOOL OF ARCHITECTURE AND PLANNING"
  },
  {
    "name": "VAISHNAVI WOMENS DEGREE COLEGE"
  },
  {
    "name": "VALLABHANENI VENKATADRI INSTITUTE OF PHARMACEUTICAL SCIENCES,  SESHADRI RAO KNOWLEDGE VILLAGE, GUDLAVALLERU, PIN-521356(CC-9V)"
  },
  {
    "name": "VAMSADHARA BACHELOR OF PHYSICAL EDUCATION"
  },
  {
    "name": "VAMSADHARA COLLEGE OF EDUCATION"
  },
  {
    "name": "VAMSADHARA DEGREE COLLEGE"
  },
  {
    "name": "VAMSADHARA DEGREE COLLEGE, KOTABOMMALI"
  },
  {
    "name": "VAMSADHARA DIPLOMA IN PHYSICAL EDUCATION"
  },
  {
    "name": "Vamsee Vinay Degree College, Vemsoor Road, Sathupally"
  },
  {
    "name": "Vandana Degree College"
  },
  {
    "name": "Vani Degree College for Women"
  },
  {
    "name": "VANI NIKETAN DEGREE & PG COLLEGE , MUKARAMPURA, KARIMNAGAR"
  },
  {
    "name": "VANI NIKETAN INSTITUTE OF MANAGEMTNT STUDIES, MUKARAMPURA, KARIMNAGAR-505002"
  },
  {
    "name": "VANI NIKETHAN VIDYA SAMITHI,  MUKARAMPURA, KARIMNAGAR"
  },
  {
    "name": "Vani Rama College of Education, Medepi, Prakasam District"
  },
  {
    "name": "VANISRI DEGREE COLLEGE KARIMNAGAR"
  },
  {
    "name": "Vanitha Degree College for Women"
  },
  {
    "name": "VARAPRASAD RAO BED COLLEGE"
  },
  {
    "name": "VARAPRASAD REDDY INSTITUTE OF TECHNOLOGY, Siddharth Nagar, Kantepudi(V), Sattenapalli(M), PIN -522438(CC-A7)"
  },
  {
    "name": "Vardhaman College of Engineering"
  },
  {
    "name": "VARMA COLLEGE OF EDUCATION"
  },
  {
    "name": "Varma College of Nursing, Tirupati"
  },
  {
    "name": "Vasavi B.Ed College, Kandulapuram Village, Cumbum "
  },
  {
    "name": "Vasavi College of Engineering"
  },
  {
    "name": "VASAVI COLLEGE OF PHARMACY"
  },
  {
    "name": "VASAVI DEGREE COLLEGE NAKREKAL"
  },
  {
    "name": "Vasavi Degree College, # 2-264, Kallur (V), Kuntala (M)"
  },
  {
    "name": "VASAVI DEGREE COLLEGE, BAYYARAM"
  },
  {
    "name": "VASAVI DEGREE COLLEGE, KALVASRIRAMPUR"
  },
  {
    "name": "Vasavi Degree College, Narasaraopeta, Guntur District"
  },
  {
    "name": "Vasavi Degree College, RR Complex, Court Road, Mahabubabad"
  },
  {
    "name": "Vasavi Institute of Management & Computer Sciences"
  },
  {
    "name": "Vasavi Institute of Pharmaceutical Science"
  },
  {
    "name": "Vasavi Mahila Kalasala,"
  },
  {
    "name": "Vasavi MBA & MCA College, Kandulapuram"
  },
  {
    "name": "Vashishta Degree College, Manjulapur, Nirmal  504 106"
  },
  {
    "name": "Vashista Degree College"
  },
  {
    "name": "Vasireddy Venkatadri Institute of Technology, Nambur (V), Pedakakani(M), PIN-522508(CC-BQ)"
  },
  {
    "name": "Vasistha Degree & PG College, Kamareddy (5037)"
  },
  {
    "name": "VASTHSALYA COLLEGE OF BUSINESS MANAGEMENT, BHONGIR"
  },
  {
    "name": "Vasundara Degree & P.G College (Co-education) Vidyanagar"
  },
  {
    "name": "VASUNDARA DEGREE COLLEGE"
  },
  {
    "name": "Vasundara Degree College (Co-Education)"
  },
  {
    "name": "Vasundara Women's Degree College"
  },
  {
    "name": "Vasundhara Degree College, Surya Complex, Industrial Area, Sirpur Khagaznagar"
  },
  {
    "name": "Vathsalya College of Pharmacy"
  },
  {
    "name": "Vathsalya Institute of Science & Technology"
  },
  {
    "name": "Veda  Degree College, Cinema Road, Tatipaka"
  },
  {
    "name": "VEDA COLLEGE OF PHARMACY"
  },
  {
    "name": "VEDA COLLEGE OF PHARMACY"
  },
  {
    "name": "VEDA DEGREE COLLEGE, CHAMPAPET"
  },
  {
    "name": "VEDAVYASA DEGREE COLLEGE, KALYANAPURAM"
  },
  {
    "name": "VEDHA COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "Vedhanidhi Degree College, Narnoor (V&M)"
  },
  {
    "name": "VEDHANIDI DEGREE COLLEGE, LOKESHWARAM"
  },
  {
    "name": "Vedhatraya Degree College, Dilwarpur (V&M)"
  },
  {
    "name": "Veerabhadra Degree College"
  },
  {
    "name": "Veerabhadra Degree College,Pebbair"
  },
  {
    "name": "Velaga Nageswara Rao College of Engineering, G.B.C.Road, Ponnur,  PIN- 522124 (CC-NK)"
  },
  {
    "name": "Velagapudi Ramakrishna Siddhartha Engineering College, Vasantha Nagar, Kanuru, Vijayawada-520007(CC-8W)"
  },
  {
    "name": "Velankanni Institute of Computer Science, Venkatachalam"
  },
  {
    "name": "Velankini College of Education, Kandrika, Venkatachalam (M)Nellore Dist"
  },
  {
    "name": "Velankini Institute of Management Studies"
  },
  {
    "name": "Vellanki College of Education"
  },
  {
    "name": "Vellore Institute of Technology - Andhra Pradesh"
  },
  {
    "name": "VEMANA DEGREE COLLEGE, DARIMADUGU, Markapur"
  },
  {
    "name": "Vemu Institute of  Technology, Chittoor"
  },
  {
    "name": "Venigalla Jayasri Ram College, Kolluru"
  },
  {
    "name": "Venkata Padmavathi College of Physiotherapy, Tirupati"
  },
  {
    "name": "Venkata Padmavthi College of Medical Lab Technology, Tirupati"
  },
  {
    "name": "Venkata Sai College of Teacher Education, Devarakadra"
  },
  {
    "name": "VENKATARAMA DEGREE COLLEGE"
  },
  {
    "name": "Venkataratna College of Education, Kurnool"
  },
  {
    "name": "VENKATASAI DEGREE COLLEGE (3092)"
  },
  {
    "name": "Venkateswara College of Eduation, Besthavaripeta"
  },
  {
    "name": "Venkateswara College of Education, Kadiri"
  },
  {
    "name": "Venkateswara Institute of Pharmaceutical Sciences"
  },
  {
    "name": "Vennela Degree College"
  },
  {
    "name": "VENNELA INSTITUTE OF BUSINESS ADMINISTRATION, ANNANTHARAM"
  },
  {
    "name": "Victoria College of Pharmacy, Nallapadu"
  },
  {
    "name": "Victory Degree College, Narsaraopeta"
  },
  {
    "name": "VIDHYARDHI DEGREE COLLEGE CHODAVARAM"
  },
  {
    "name": "Vidwan Degree College"
  },
  {
    "name": "Vidya Bharathi Degree College, Tandoor"
  },
  {
    "name": "Vidya Dayani College of Information Technology"
  },
  {
    "name": "Vidya Dayani Degree & P.G College (UG)"
  },
  {
    "name": "VIDYA DAYINI WOMENS DEGREE COLLEGE"
  },
  {
    "name": "Vidya Degree College, Marikal"
  },
  {
    "name": "Vidya Jyothi Degree & P.G. College, Station Ghanpur 506 144"
  },
  {
    "name": "Vidya Jythi Institute of Technology"
  },
  {
    "name": "Vidya Kendran Degree College, Sattenapalli"
  },
  {
    "name": "Vidya Ratna Dr. K.G.A. Guptha Degree College, Agaili"
  },
  {
    "name": "VIDYADHARI DEGREE COLLEGE"
  },
  {
    "name": "VIDYALATHA DEGREE COLLEGE OF COMMERCE & BUSINESS MANAGEMENT KARIMNAGAR"
  },
  {
    "name": "Vidyalaya College of Education, Tirupati"
  },
  {
    "name": "VIDYALAYA DEGREE COLLEGE"
  },
  {
    "name": "Vidyalaya Degree College, Gudur"
  },
  {
    "name": "Vidyanidhi Degree College"
  },
  {
    "name": "VIDYANIKETAN DEGREE COLLEGE RAMAKUPPAM"
  },
  {
    "name": "Vidyanjali College of Arts & Sciences Sullurupet"
  },
  {
    "name": "VIDYANJALI DEGREE & PG COLLEGE"
  },
  {
    "name": "VIDYANJALI DEGREE COLLEGE"
  },
  {
    "name": "VIDYARTHI COLLEGE OF EDUCATION"
  },
  {
    "name": "Vidyarthi Degree College (Azampura, Medak)"
  },
  {
    "name": "Vidyarthi Degree College, # 1-2-13/1, Ravindranagar, Adilabad"
  },
  {
    "name": "VIF College of Engineering & Technology"
  },
  {
    "name": "Vignan College of Education"
  },
  {
    "name": "VIGNAN DEGREE COLLEGE"
  },
  {
    "name": "VIGNAN DEGREE COLLEGE"
  },
  {
    "name": "VIGNAN DEGREE COLLEGE (ATTAPUR)"
  },
  {
    "name": "Vignan Degree College (Bandlaguda)"
  },
  {
    "name": "Vignan Degree College, Bangarupalem"
  },
  {
    "name": "VIGNAN DEGREE COLLEGE, CHEJARLLA"
  },
  {
    "name": "Vignan Degree College, Chemakurthi"
  },
  {
    "name": "Vignan Degree College, Guntur"
  },
  {
    "name": "VIGNAN DEGREE COLLEGE, KADAPA"
  },
  {
    "name": "Vignan Degree College, O.D. Cheruvu"
  },
  {
    "name": "Vignan Degree College, Shadnagar"
  },
  {
    "name": "VIGNAN DEGREE COLLEGE, VISANNAPETA"
  },
  {
    "name": "VIGNAN DEGREE COLLEGE,KAIKALURU"
  },
  {
    "name": "Vignan Degree CollegePodalakur"
  },
  {
    "name": "Vignan Institute of Pharmaceutical Sciences"
  },
  {
    "name": "VIGNAN INSTITUTE OF PHARMACEUTICAL TECHNOLOGY, Beside VSEZ, Vadlapudi (PO),Jaggarajupeta(V),Gajuwaka ,PIN-530049(CC-AC))"
  },
  {
    "name": "Vignan Institute of Science & Arts"
  },
  {
    "name": "Vignan Institute of Technology & Sciences"
  },
  {
    "name": "Vignan Pharmacy College, Vadlamudi Post, Chebrolu Mandalam, PIN- 522 213(CC-AB)"
  },
  {
    "name": "Vignan's Foundation of Science, Technology & Research, Guntur"
  },
  {
    "name": "Vignan's Institute of Engineering for Women, Kapujaggarupeta, Vadlapudi Post, Gajuwaka, PIN-530049(CC-NM)"
  },
  {
    "name": "Vignan's Institute of Information Technology, Beside VSEZ, Duvvada, Gajuwaka,Vadlapudi (P.O)Pin-530049  (CC-L3)"
  },
  {
    "name": "Vignan's Institute of Management & Technology For Women"
  },
  {
    "name": "Vignan's Lara Institute of Technology & Science, Vadlamudi, Chebrolu Mandal, PIN-522213(CC-FE)"
  },
  {
    "name": "Vignan's Nirula Institute of Technology & Science for Women, Vign avenue, Palakaluru Road  , PIN-522 005(CC-NN)"
  },
  {
    "name": "Vignana Bharathi Degree College, H.No. 5-4-109, Kankara Boad, Maha"
  },
  {
    "name": "VIGNANA BHARATHI ENGINEERING COLLEGE"
  },
  {
    "name": "Vignana Bharathi Institute of Technology"
  },
  {
    "name": "Vignana Jyothi Institute of Arts & Sciences (Co-Ed)"
  },
  {
    "name": "Vignana Sudha Degree College Chittoor"
  },
  {
    "name": "Vignanasudha Institute of Management &Technology, Chittoor"
  },
  {
    "name": " Vijatha Dgree  College Dr.Y.L.P.Degree College of Arts & Sciences"
  },
  {
    "name": "Vijay College of Nursing, Srikakulam"
  },
  {
    "name": "Vijay College of Pharmacy"
  },
  {
    "name": "Vijay Degree & PG College, Armoor (5040)"
  },
  {
    "name": "Vijay Marie College of Nursing, Hyderabad"
  },
  {
    "name": "Vijay Rural Engineering College"
  },
  {
    "name": "VIJAYA BEHARA COLLEGE OF EDUCATION "
  },
  {
    "name": "Vijaya Bharathi College of Education"
  },
  {
    "name": "VIJAYA COLLEGE OF NURSING"
  },
  {
    "name": "Vijaya College of Nursing, Kurnool"
  },
  {
    "name": "Vijaya College of Nursing, Nellore"
  },
  {
    "name": "Vijaya College of Pharmacy"
  },
  {
    "name": "Vijaya College of Physical Education, Nunna"
  },
  {
    "name": "Vijaya Degree College, S.N Puram (V), Varni (5057)"
  },
  {
    "name": "Vijaya Engineering College"
  },
  {
    "name": "Vijaya Health Care Academic Society College of Nursing, Kushaiguda"
  },
  {
    "name": "VIJAYA INSTITUTE OF MANAGEMENT"
  },
  {
    "name": "Vijaya Institute of Pharmaceutical Sciences for Women, Enkepadu, Vijayawada-521108(CC-7N)"
  },
  {
    "name": "Vijaya Institute of Technology for Women,Enikepadu, Vijayawada, PIN-521108  (CC-NP)"
  },
  {
    "name": "Vijaya Jyothi Degree College, Mangalagiri"
  },
  {
    "name": "Vijaya Krishna College of Nursing, Visakhapatnam"
  },
  {
    "name": "VIJAYA LAKSHMI COLLEGE OF EDUCATION"
  },
  {
    "name": "VIJAYA PG COLLEGE (MBA)"
  },
  {
    "name": "Vijaya Sai Degree College"
  },
  {
    "name": "VIJAYA SAI DEGREE COLLEGE(085),PATTIKONDA."
  },
  {
    "name": "VIJAYA SCHOOL OF BUSINESS MANAGEMENT"
  },
  {
    "name": "VIJAYALAKSHMI DEGREE COLLEGE  SRIKALAHASTI "
  },
  {
    "name": "VIJAYAM BUSINESS SCHOOL"
  },
  {
    "name": "Vijayam Science & Arts Degree College, Chittoor"
  },
  {
    "name": "Vijayanagar College of Commerce"
  },
  {
    "name": "Vijayateja Degree College, Addanki"
  },
  {
    "name": "Vijeta Degree College, Wanaparthy"
  },
  {
    "name": "VIJETHA COLLEGE OF EDUCATION, Singarayakonda"
  },
  {
    "name": "Vijetha Degree & PG College, Armoor (5041)"
  },
  {
    "name": "Vijetha Degree College"
  },
  {
    "name": "VIJETHA DEGREE COLLEGE (Gajwel)"
  },
  {
    "name": "VIJETHA DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "VIJETHA DEGREE COLLEGE, MIRYALAGUDA"
  },
  {
    "name": "VIJETHA DEGREE COLLEGE, SURYAPET"
  },
  {
    "name": "Vijnana Bharathi Degree College, Kamareddy (5012)"
  },
  {
    "name": "VIJNANA NILAYAM DEGREE COLLEGE"
  },
  {
    "name": "VIKAS CHRISTIAN COLLEGE OF EDUCATION, SURYAPET"
  },
  {
    "name": "Vikas College of Education"
  },
  {
    "name": "VIKAS COLLEGE OF EDUCATION"
  },
  {
    "name": "Vikas College of Education, Darsi"
  },
  {
    "name": "Vikas College of Education, Pabbapuram"
  },
  {
    "name": "Vikas College of Engineering and Technology"
  },
  {
    "name": "VIKAS COLLEGE OF PHARMACEUTICAL SCIENCES, RAYANIGUDEM"
  },
  {
    "name": "VIKAS COLLEGE OF PHARMACY, PUTRELA ROAD, VISANNA PET"
  },
  {
    "name": "VIKAS COLLEGE OF PHARMACY, Shameerpet"
  },
  {
    "name": "Vikas College of Physical Education, Nunna"
  },
  {
    "name": "VIKAS DEEGREE COLLEGE,  MANKAMMATHOTA, KARIMNAGAR"
  },
  {
    "name": "VIKAS DEGREE COLLEGE"
  },
  {
    "name": "Vikas Degree College"
  },
  {
    "name": "VIKAS DEGREE COLLEGE"
  },
  {
    "name": "Vikas Degree College"
  },
  {
    "name": "VIKAS DEGREE COLLEGE FOR WOMEN"
  },
  {
    "name": "Vikas Degree College, # 1-119/1, Ponkal, Jannaram (M)"
  },
  {
    "name": "Vikas Degree College, (Co-Education), Atmakur"
  },
  {
    "name": "Vikas Degree College, 1-3-85, Mahabubabad"
  },
  {
    "name": "VIKAS DEGREE COLLEGE, 70-2-51, SIDHULAWADA, SIRCILLA"
  },
  {
    "name": "Vikas Degree College, H.No. 1-2-235, Opp. Govt. Hospital, Jangaon  506 167"
  },
  {
    "name": "Vikas Degree College, Kuppam, Chittoor"
  },
  {
    "name": "Vikas Degree College, Macherla"
  },
  {
    "name": "VIKAS DEGREE COLLEGE, MANDAVALLI"
  },
  {
    "name": "VIKAS DEGREE COLLEGE, RATHNAPUR (V), KAMANPUR"
  },
  {
    "name": "VIKAS DEGREE COLLEGE, REDDYGUDEM"
  },
  {
    "name": "Vikas Degree College, Station Road, Khammam"
  },
  {
    "name": "VIKAS DEGREE COLLEGE, VISSANNAPETA"
  },
  {
    "name": "VIKAS DEGREE COLLEGE,KHAMBAMPADU"
  },
  {
    "name": "Vikas Group of Institutions, Nunna, Vijayawada (Rural)"
  },
  {
    "name": "Vikas Institute of Business Management"
  },
  {
    "name": "VIKAS INSTITUTE OF PHARMACEUTICAL SCIENCES"
  },
  {
    "name": "VIKAS POLYTECHNIC OF AGRICULTURAL ENGINEERING"
  },
  {
    "name": "VIKAS POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "Vikram    Degree College      Srikalahasti,   Urban"
  },
  {
    "name": "Vikram Simhapuri University, Nellore"
  },
  {
    "name": "Vikrama Simhapuri University P.G.Center, Kavali"
  },
  {
    "name": "Villa Marie Degree College for Women"
  },
  {
    "name": "VILLA MARIE POST GRADUATE COLLEGE FOR WOMEN"
  },
  {
    "name": "VIMS College of Medical Lab Technology, Vijaywada"
  },
  {
    "name": "VIMS College of Physiotheraphy, Vijayawada"
  },
  {
    "name": "VIMS Mother Theresa College of Nursing, Vijayawada"
  },
  {
    "name": "VINANDA DEGREE COLLEGE"
  },
  {
    "name": "Vinayaka College of I.T. and Business Management"
  },
  {
    "name": "VINAYAKA COLLEGE OF PHYSICAL EDUCATION"
  },
  {
    "name": "VINAYAKA LAW COLLEGE"
  },
  {
    "name": "VINAYAKA POLYTECHNIC OF AGRICULTURAL ENGINEERING"
  },
  {
    "name": "VINAYAKA POLYTECHNIC OF AGRICULTURE"
  },
  {
    "name": "VINAYAKA VENKATESWARA INSTITUTE OF MEDICAL AND SCIENCES PHYSIOTHERAPY"
  },
  {
    "name": "Vinex Degree College, Dwarakanagar, vskp"
  },
  {
    "name": "Vinukonda B.Ed. College"
  },
  {
    "name": "Vinuthna College of Management, Hasanparthy, Warangal"
  },
  {
    "name": "Vinuthna Institute of Technology & Science, Hasanparthy (V&M), Warangal"
  },
  {
    "name": "VISAKHA ACADEMY OF PARAMEDICAL SCIENCES COLLEGE OF PHYSIOTHERAPY, VISAKHAPATNAM "
  },
  {
    "name": "Visakha Govt. Degree College for Women"
  },
  {
    "name": "Visakha Institute for Professional Studies"
  },
  {
    "name": "Visakha Institute of Engineering & Technology, 57th Division,  Narava,  PIN- 530027(CC-NT)"
  },
  {
    "name": "Visakha Institute of Management Science, Bodamettapalem (V), Dakamarri, Bheemunipatnam (M), 531162 (CC-8M)"
  },
  {
    "name": "Visakha Law College"
  },
  {
    "name": "VISHISTA DEGREE COLLEGE"
  },
  {
    "name": "Vishnu Dental College, Bheemavaram"
  },
  {
    "name": "Vishnu Institute of Pharmaceutical Education and Research"
  },
  {
    "name": "Vishnu Institute of Technology, Vishnupur, Bhimavaram, PIN-534202(CC-PA)"
  },
  {
    "name": "Vishwa Bharathi Arts & Science Degree College"
  },
  {
    "name": "Vishwa Bharathi College of Pharmaceutical Sciences, NRT Road, Perecherla, PIN-522009.(CC-43)"
  },
  {
    "name": "Vishwa Bharathi Degree College"
  },
  {
    "name": "VISHWA BHARATHI DEGREE COLLEGE"
  },
  {
    "name": "VISHWA HITHA DEGREE COLLEGE MADANAPALLE"
  },
  {
    "name": "VISHWA VIKAS DEGREE COLLEGE NAGARKURNOOL"
  },
  {
    "name": "Vishwa Vishwani Institute of Systems & Management"
  },
  {
    "name": "Vishwa Vishwani School of Business Hyderabad"
  },
  {
    "name": "Vishwas Degree College, H.No. 5-13/1, Rajeev Chowrastha, Palakurthy (V&M), Warangal District"
  },
  {
    "name": "VISHWATEJA DEGREE COLLEGE, MULUGU"
  },
  {
    "name": "Vision College of Pharmaceutical Sciences"
  },
  {
    "name": "VISION DEGREE COLLEGE"
  },
  {
    "name": "Vision P.G College"
  },
  {
    "name": "Visionary Degree College"
  },
  {
    "name": "Visovadaya Govt. Degree College, Venkatagiri"
  },
  {
    "name": "Visvesvaraya College of Engineering Technology"
  },
  {
    "name": "VISWA BHARATHI COLLEGE OF LAW"
  },
  {
    "name": "Viswa Bharathi College of Nursing, Kurnool"
  },
  {
    "name": "VISWABHARATHI COLLEGE OF ALLIED AND HEALTHCARE PROFESSIONS"
  },
  {
    "name": "VISWABHARATHI COLLEGE OF MEDICAL LAB TECHNOLOGY B.SC MLT, PENCHIKALAPADU"
  },
  {
    "name": "VISWABHARATHI COLLEGE OF PHYSIOTHERAPY AND REHABILITATION"
  },
  {
    "name": "VISWABHARATHI DEGREE COLLEGE"
  },
  {
    "name": "VISWABHARATHI MEDICAL COLLEGE"
  },
  {
    "name": "Viswam Degree & PG College, Angallu, Chittoor Dist."
  },
  {
    "name": "Viswam Degree College, Naidupet"
  },
  {
    "name": "Viswam Engineering College"
  },
  {
    "name": "Viswambhara College of Education, Bollikunta, Warangal"
  },
  {
    "name": "Viswanandha Institute of Pharmaceutical Sciences, Mindivanipalem, Sontam Panchayat, Anandapuram Mandal, PIN-531173  (CC-PK)"
  },
  {
    "name": "VISWASHANTHI COLLEGE OF NURSING"
  },
  {
    "name": "Viswashanti Degree College, Alam pur 'X' Road"
  },
  {
    "name": "VISWATEJA DEGREE COLLEGE"
  },
  {
    "name": "VIVEK VARDHINI SCHOOL OF BUSINESS MANAGEMENT"
  },
  {
    "name": "Viveka Arts & Science Degree College, Pamuru"
  },
  {
    "name": "Viveka College of Education, Vaddesangam"
  },
  {
    "name": "VIVEKA DEGREE COLLEGE"
  },
  {
    "name": "Viveka Vardhani Bhaskar Degree College"
  },
  {
    "name": "Vivekananda   Degree College   CHITTOOR Urban"
  },
  {
    "name": "VIVEKANANDA COLLEGE OF COMPUTER SCIENCES"
  },
  {
    "name": "Vivekananda College of Computers, Shadnagar"
  },
  {
    "name": "Vivekananda College of Education"
  },
  {
    "name": "Vivekananda College of Education, Adilabad"
  },
  {
    "name": "Vivekananda College of Education, Chattanpalli"
  },
  {
    "name": "Vivekananda College of Education, Kandukur"
  },
  {
    "name": "Vivekananda College of Education, Narsampet"
  },
  {
    "name": "VIVEKANANDA DEGREE & PG COLLEGE, JAGTIAL ROAD, KARIMNAGAR"
  },
  {
    "name": "VIVEKANANDA DEGREE COLLEGE"
  },
  {
    "name": "Vivekananda Degree College (Kukatpally)"
  },
  {
    "name": "Vivekananda Degree College (Sithaphal Mandi)"
  },
  {
    "name": "Vivekananda Degree College, Balighattam, Narsipatnam"
  },
  {
    "name": "VIVEKANANDA DEGREE COLLEGE, CHEVELLA"
  },
  {
    "name": "VIVEKANANDA DEGREE COLLEGE, HUSNABAD"
  },
  {
    "name": "Vivekananda Degree College, Kadiri"
  },
  {
    "name": "VIVEKANANDA DEGREE COLLEGE, KARIMNAGAR"
  },
  {
    "name": "Vivekananda Degree College, Kubeer"
  },
  {
    "name": "Vivekananda Degree College, Nellore"
  },
  {
    "name": "Vivekananda Degree College, Shadnagar"
  },
  {
    "name": "VIVEKANANDA DEGREE COLLEGE, SIRISILLA"
  },
  {
    "name": "Vivekananda Degree College, Vidhyanagar colony, Echoda (V&M)"
  },
  {
    "name": "Vivekananda Govt. Degree College"
  },
  {
    "name": "Vivekananda Institute of Science & InformationTechnology"
  },
  {
    "name": "Vivekananda Institute of Technology and Science"
  },
  {
    "name": "VIvekananda P.G College"
  },
  {
    "name": "VIVEKANANDA PG COLLEGE, JAGTIAL ROAD, KARIMNAGAR"
  },
  {
    "name": "Vivekavardhani Degree College for Women, Laxmidevipally, Kothagudem"
  },
  {
    "name": "VIVEKAVARDHANI DEGREE COLLEGE, D.No. 1-117, Near Bus Stand, GUNDALA, Khammam"
  },
  {
    "name": "Vivekavardhani Degree College, Kothagudem"
  },
  {
    "name": "Vivekavardhini Degree College, Near Bus Stand, Mancherial"
  },
  {
    "name": "VJP and DLB DEGREE COLLEGE, Mangalagiri"
  },
  {
    "name": "VKDVS Raju Degree College, Aswaraopet"
  },
  {
    "name": "VKR, VNB & AGK COLLEGE OF ENGINEERING, ELURU ROAD, GUDIVADA, PIN - 521301  (CC-NH)"
  },
  {
    "name": "VMS DEGREE COLLEGE, RAJENDRA NAGAR"
  },
  {
    "name": "VNR Vignanajyothi Institute of Engineering & Technology"
  },
  {
    "name": "VODITHALA SRINIVASA RAO DEGREE COLLEGE HUZURABAD"
  },
  {
    "name": "VPR College of Education"
  },
  {
    "name": "VRK DEGREE COLLEGE JADCHERLA"
  },
  {
    "name": "VRN College of Computer Science and Mgmt, Peruru, Tirupati."
  },
  {
    "name": "VRR DEGREE COLLEGE"
  },
  {
    "name": "VRS & YRN College of Engineering & Technology, Vodarevu Road, Chirala(M)-523157(CC-L1)"
  },
  {
    "name": "VRS Degree College"
  },
  {
    "name": "VSL Degree College"
  },
  {
    "name": "VSM COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "VVRL Kanaka Mahalakshmi Degree College"
  },
  {
    "name": "VVS POST GRADUATE COLLEGE, CHRIST VIDYA NAGAR"
  },
  {
    "name": "Vyagheswarudu Inst. of Physical Medicine & Rehabilitation, Visakhapatnam"
  },
  {
    "name": "Vydya College of B.Sc MLT, Vizianagaram"
  },
  {
    "name": "Vyshnavi College of Education, Gurazala"
  },
  {
    "name": "Vyshnavi Degree College, Dhone"
  },
  {
    "name": "Vyshnavi Degree College, Thripurantakam"
  },
  {
    "name": "W. C. C. M, Wanaparthy"
  },
  {
    "name": "Warangal Institute of Technology & Science, Oorugonda (V), Athmakur (M), Warangal"
  },
  {
    "name": "Wellfare Institute of Science, Technology and Management"
  },
  {
    "name": "Wesley Degree College (Co-Edn)"
  },
  {
    "name": "Wesley Degree College for Women"
  },
  {
    "name": "WESLEY PG COLLEGE    "
  },
  {
    "name": "WEST GODAVARI INSTITUTE OF SCIENCE AND ENGINEERING"
  },
  {
    "name": "WESTIN COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "WESTIN COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "WINGS BUSINESS SCHOOL, KKV PURAM, R C PURAM"
  },
  {
    "name": "Wisdom Degree College"
  },
  {
    "name": "WISDOM DEGREE COLLEGE , RENTACHINTALA"
  },
  {
    "name": "Women's Degree College, Nizamabad (5042)"
  },
  {
    "name": "WOXSEN UNIVERSITY"
  },
  {
    "name": "Y.A. Govt. College for Women"
  },
  {
    "name": "Y.K.M.College of Education"
  },
  {
    "name": "Y.R.College of Arts & Science & Tech"
  },
  {
    "name": "Y.V. RAO SIDDHARTHA COLLEGE OF EDUCATION"
  },
  {
    "name": "Y.V.N.R. GOVT.DEGREE COLLEGE"
  },
  {
    "name": "Yadaiah College of Education"
  },
  {
    "name": "Yalamarthy College Of Education"
  },
  {
    "name": "Yalamarthy Inst. Of Sciences"
  },
  {
    "name": "Yalamarty B-Pharmacy College"
  },
  {
    "name": "Yanamadala Kamala College of Education"
  },
  {
    "name": "Yashoda College of Nursing, Hyderabad"
  },
  {
    "name": "Yashoda College of Nursing, Medchal"
  },
  {
    "name": "YASHODA COLLEGE OF PHYSIOTHERAPY"
  },
  {
    "name": "Yashoda Institute Of Physiotherapy"
  },
  {
    "name": "Yashoda Laxmi College of Nursing, Medchal"
  },
  {
    "name": "Yasmeen B.Ed. College"
  },
  {
    "name": "Yeswanth College of Education, Bestavaripeta"
  },
  {
    "name": "Yogi Vemana University, Kadapa"
  },
  {
    "name": "YPR College of Education"
  },
  {
    "name": "YSR ENGINEERING COLLEGE OF YVU"
  },
  {
    "name": "YSR VIVEKANANDA GOVERNMENT DEGREE COLLEGE"
  },
  {
    "name": "YVNR Degree College"
  },
  {
    "name": "ZENEX VISION DEGREE COLLEGE"
  },
  {
    "name": "ZENEX VISION SCHOOL OF BUSINESS AND TECHNOLOGY    "
  },
  {
    "name": "ZEST COLLEGE OF HOTEL MANAGEMENT"
  },
  {
    "name": "ZOHARS COLLEGE OF EDUCATION"
  },
  {
    "name": "Zunaira Degree College, Nizamabad (5068)"
  }
];

export default institutions;