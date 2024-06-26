CREATE SCHEMA IF NOT EXISTS qscore;

CREATE TABLE qscore.qscores (
    qscore_id SERIAL PRIMARY KEY,
    vendor VARCHAR(20) NOT NULL,
    material VARCHAR(20) NOT NULL,
    qscore numeric(16, 2) NOT NULL,
    evaluate VARCHAR(255) NOT NULL,
    accumary_delivery numeric(16, 0) NOT NULL,
    sampling VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE qscore.qscores_result (
    id SERIAL PRIMARY KEY,
    instlot VARCHAR(20) UNIQUE NOT NULL,
    batch VARCHAR(20) UNIQUE NOT NULL,
    plant VARCHAR(20) NOT NULL,
    vendor VARCHAR(20) NOT NULL,
    material VARCHAR(20) NOT NULL,
    evaluate VARCHAR(255) NOT NULL,
    sampling VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO qscore.qscores (vendor, material, qscore, evaluate, accumary_delivery, sampling) VALUES
    ('500000593','P000000038','10121','Pass Through 100%','27','No Sampling'),
    ('500000593','P000000040','11120','Pass Through 100%','22','No Sampling'),
    ('500000593','P000000043','10121','Pass Through 100%','16','No Sampling'),
    ('500000593','P000000044','10121','Pass Through 100%','19','No Sampling'),
    ('500000593','P000000279','10121','Pass Through 100%','18','No Sampling'),
    ('500000593','P000000284','10121','Pass Through 100%','20','No Sampling'),
    ('500000593','P000000371','10121','Pass Through 100%','18','No Sampling'),
    ('500000593','P000000383','11120','Pass Through 100%','17','No Sampling'),
    ('500000593','P000000540','10121','Pass Through 100%','16','No Sampling'),
    ('500000593','P000000565','10121','Pass Through 100%','117','No Sampling'),
    ('500001221','P000001292','10121','Pass Through 100%','19','No Sampling'),
    ('500001221','P000001316','10121','Pass Through 100%','29','No Sampling'),
    ('500001221','P000001318','10121','Pass Through 100%','16','No Sampling'),
    ('500001221','P000001320','10121','Pass Through 100%','27','No Sampling'),
    ('500001221','P000001338','10121','Pass Through 100%','26','No Sampling'),
    ('500001221','P000001342','10121','Pass Through 100%','26','No Sampling'),
    ('500001221','P000001343','10121','Pass Through 100%','24','No Sampling'),
    ('500001221','P000001354','10121','Pass Through 100%','44','No Sampling'),
    ('500001221','P000001357','10121','Pass Through 100%','17','No Sampling'),
    ('500001221','P000001359','10121','Pass Through 100%','16','No Sampling'),
    ('500001221','P000001360','10121','Pass Through 100%','24','No Sampling'),
    ('500001221','P000001663','10121','Pass Through 100%','16','No Sampling'),
    ('500001221','P000002097','10121','Pass Through 100%','15','No Sampling'),
    ('500001221','P000002289','10121','Pass Through 100%','31','No Sampling'),
    ('500001221','P000002331','10121','Pass Through 100%','30','No Sampling'),
    ('500001221','P000002334','10121','Pass Through 100%','24','No Sampling'),
    ('500001221','P000004601','10121','Pass Through 100%','20','No Sampling'),
    ('500001437','P000000038','10121','Pass Through 100%','39','No Sampling'),
    ('500001437','P000000362','10121','Pass Through 100%','38','No Sampling'),
    ('500001437','P000000367','11120','Pass Through 100%','22','No Sampling'),
    ('500001437','P000000368','11120','Pass Through 100%','60','No Sampling'),
    ('500001437','P000000370','10121','Pass Through 100%','19','No Sampling'),
    ('500001437','P000000371','11120','Pass Through 100%','69','No Sampling'),
    ('500001437','P000000372','11120','Pass Through 100%','52','No Sampling'),
    ('500001437','P000000373','11120','Pass Through 100%','55','No Sampling'),
    ('500001437','P000000375','11120','Pass Through 100%','23','No Sampling'),
    ('500001437','P000000380','10121','Pass Through 100%','45','No Sampling'),
    ('500001437','P000000384','10121','Pass Through 100%','26','No Sampling'),
    ('500001437','P000000390','10121','Pass Through 100%','26','No Sampling'),
    ('500001437','P000000391','10121','Pass Through 100%','27','No Sampling'),
    ('500001437','P000000397','11120','Pass Through 100%','17','No Sampling'),
    ('500001437','P000000398','10121','Pass Through 100%','31','No Sampling'),
    ('500001437','P000000403','10121','Pass Through 100%','26','No Sampling'),
    ('500001437','P000000405','11120','Pass Through 100%','104','No Sampling'),
    ('500001437','P000000418','11120','Pass Through 100%','19','No Sampling'),
    ('500001437','P000000420','11120','Pass Through 100%','17','No Sampling'),
    ('500001437','P000000424','11120','Pass Through 100%','20','No Sampling'),
    ('500001437','P000000429','10121','Pass Through 100%','16','No Sampling'),
    ('500001437','P000000430','11120','Pass Through 100%','17','No Sampling'),
    ('500001437','P000000448','10121','Pass Through 100%','17','No Sampling'),
    ('500001437','P000000457','10121','Pass Through 100%','15','No Sampling'),
    ('500001437','P000000471','10121','Pass Through 100%','21','No Sampling'),
    ('500001437','P000000483','10121','Pass Through 100%','29','No Sampling'),
    ('500001437','P000000484','10121','Pass Through 100%','26','No Sampling'),
    ('500001437','P000000485','10121','Pass Through 100%','39','No Sampling'),
    ('500001437','P000000537','10121','Pass Through 100%','20','No Sampling'),
    ('500001437','P000000538','10121','Pass Through 100%','59','No Sampling'),
    ('500001437','P000000539','10121','Pass Through 100%','67','No Sampling'),
    ('500001437','P000000551','10121','Pass Through 100%','39','No Sampling'),
    ('500001437','P000000552','11120','Pass Through 100%','58','No Sampling'),
    ('500001437','P000000553','10121','Pass Through 100%','52','No Sampling'),
    ('500001437','P000000554','10121','Pass Through 100%','15','No Sampling'),
    ('500001437','P000000557','11120','Pass Through 100%','123','No Sampling'),
    ('500001437','P000000559','11120','Pass Through 100%','186','No Sampling'),
    ('500001437','P000000560','10121','Pass Through 100%','25','No Sampling'),
    ('500001437','P000000561','11120','Pass Through 100%','72','No Sampling'),
    ('500001437','P000000562','10121','Pass Through 100%','46','No Sampling'),
    ('500001437','P000000563','10121','Pass Through 100%','48','No Sampling'),
    ('500001437','P000000564','11120','Pass Through 100%','45','No Sampling'),
    ('500001437','P000000565','10121','Pass Through 100%','21','No Sampling'),
    ('500001437','P000000566','10121','Pass Through 100%','24','No Sampling'),
    ('500001437','P000000568','10121','Pass Through 100%','15','No Sampling'),
    ('500001437','P000001569','10121','Pass Through 100%','91','No Sampling'),
    ('500001437','P000001576','10121','Pass Through 100%','38','No Sampling'),
    ('500001437','P000003815','10121','Pass Through 100%','15','No Sampling'),
    ('500001437','P000004856','10121','Pass Through 100%','38','No Sampling'),
    ('500003218','P000000010','10121','Pass Through 100%','17','No Sampling'),
    ('500003218','P000000344','10121','Pass Through 100%','15','No Sampling'),
    ('500003218','P000000405','10121','Pass Through 100%','17','No Sampling'),
    ('500003218','P000000450','11120','Pass Through 100%','18','No Sampling'),
    ('500003218','P000000451','11120','Pass Through 100%','45','No Sampling'),
    ('500003218','P000000537','10121','Pass Through 100%','36','No Sampling'),
    ('500003218','P000000538','10121','Pass Through 100%','31','No Sampling'),
    ('500003218','P000000539','10121','Pass Through 100%','78','No Sampling'),
    ('500003218','P000000542','10121','Pass Through 100%','17','No Sampling'),
    ('500003218','P000000548','10121','Pass Through 100%','15','No Sampling'),
    ('500003218','P000000549','10121','Pass Through 100%','19','No Sampling'),
    ('500003218','P000000551','10121','Pass Through 100%','22','No Sampling'),
    ('500003218','P000000552','10121','Pass Through 100%','42','No Sampling'),
    ('500003218','P000000553','11120','Pass Through 100%','38','No Sampling'),
    ('500003218','P000000554','10121','Pass Through 100%','23','No Sampling'),
    ('500003218','P000000555','10121','Pass Through 100%','24','No Sampling'),
    ('500003218','P000000557','11120','Pass Through 100%','33','No Sampling'),
    ('500003218','P000000559','11120','Pass Through 100%','41','No Sampling'),
    ('500003218','P000000560','11120','Pass Through 100%','36','No Sampling'),
    ('500003218','P000000561','11120','Pass Through 100%','53','No Sampling'),
    ('500003218','P000000564','10121','Pass Through 100%','52','No Sampling'),
    ('500003218','P000000566','10121','Pass Through 100%','38','No Sampling'),
    ('500003218','P000000568','10121','Pass Through 100%','16','No Sampling'),
    ('500003218','P000001298','10121','Pass Through 100%','20','No Sampling'),
    ('500003218','P000001304','10121','Pass Through 100%','20','No Sampling'),
    ('500003218','P000001587','10121','Pass Through 100%','57','No Sampling'),
    ('500003218','P000002036','10121','Pass Through 100%','17','No Sampling'),
    ('500003218','P000002037','10121','Pass Through 100%','23','No Sampling'),
    ('500003218','P000002045','10121','Pass Through 100%','18','No Sampling'),
    ('500003218','P000004615','10121','Pass Through 100%','46','No Sampling'),
    ('500003218','P000004856','10121','Pass Through 100%','16','No Sampling'),
    ('500003837','P000000540','11120','Pass Through 100%','105','No Sampling'),
    ('500003837','P000003750','10121','Pass Through 100%','15','No Sampling'),
    ('500004353','P000000043','10121','Pass Through 100%','16','No Sampling'),
    ('500004353','P000000383','10121','Pass Through 100%','20','No Sampling'),
    ('500004353','P000000448','10121','Pass Through 100%','23','No Sampling'),
    ('500004353','P000000451','10121','Pass Through 100%','15','No Sampling'),
    ('500004353','P000000565','11120','Pass Through 100%','85','No Sampling'),
    ('500004937','P000001295','10121','Pass Through 100%','35','No Sampling'),
    ('500004937','P000001298','10121','Pass Through 100%','20','No Sampling'),
    ('500004937','P000001299','10121','Pass Through 100%','25','No Sampling'),
    ('500004937','P000001300','10121','Pass Through 100%','38','No Sampling'),
    ('500004937','P000001301','10121','Pass Through 100%','43','No Sampling'),
    ('500004937','P000001302','10121','Pass Through 100%','24','No Sampling'),
    ('500004937','P000001304','10121','Pass Through 100%','38','No Sampling'),
    ('500004937','P000001662','10121','Pass Through 100%','31','No Sampling'),
    ('500004937','P000001905','10121','Pass Through 100%','42','No Sampling'),
    ('500005020','P000000057','11120','Pass Through 100%','16','No Sampling'),
    ('500005020','P000000380','11120','Pass Through 100%','19','No Sampling'),
    ('500005020','P000000384','10121','Pass Through 100%','19','No Sampling'),
    ('500005020','P000000391','10121','Pass Through 100%','18','No Sampling'),
    ('500005020','P000000397','10121','Pass Through 100%','22','No Sampling'),
    ('500005020','P000000398','11120','Pass Through 100%','26','No Sampling'),
    ('500005020','P000000399','10121','Pass Through 100%','15','No Sampling'),
    ('500005020','P000000403','11120','Pass Through 100%','19','No Sampling'),
    ('500005020','P000000405','11120','Pass Through 100%','124','No Sampling'),
    ('500005020','P000000421','10121','Pass Through 100%','27','No Sampling'),
    ('500005020','P000000424','10121','Pass Through 100%','30','No Sampling'),
    ('500005020','P000000428','11120','Pass Through 100%','37','No Sampling'),
    ('500005020','P000000429','10121','Pass Through 100%','24','No Sampling'),
    ('500005020','P000000430','10121','Pass Through 100%','26','No Sampling'),
    ('500005020','P000000434','10121','Pass Through 100%','16','No Sampling'),
    ('500005020','P000000449','10121','Pass Through 100%','20','No Sampling'),
    ('500005020','P000000450','11120','Pass Through 100%','17','No Sampling'),
    ('500005020','P000000451','10121','Pass Through 100%','25','No Sampling'),
    ('500005020','P000000452','10121','Pass Through 100%','18','No Sampling'),
    ('500005020','P000000474','10121','Pass Through 100%','16','No Sampling'),
    ('500005020','P000001298','10121','Pass Through 100%','22','No Sampling'),
    ('500005020','P000001661','10121','Pass Through 100%','24','No Sampling'),
    ('500005020','P000002036','11120','Pass Through 100%','24','No Sampling'),
    ('500005020','P000002037','10121','Pass Through 100%','19','No Sampling'),
    ('500005020','P000003815','10121','Pass Through 100%','15','No Sampling'),
    ('500005052','P000000038','11120','Pass Through 100%','28','No Sampling'),
    ('500005052','P000000040','10121','Pass Through 100%','18','No Sampling'),
    ('500005052','P000000041','10121','Pass Through 100%','17','No Sampling'),
    ('500005052','P000000043','11120','Pass Through 100%','18','No Sampling'),
    ('500005052','P000000044','11120','Pass Through 100%','35','No Sampling'),
    ('500005052','P000000053','10121','Pass Through 100%','20','No Sampling'),
    ('500005052','P000000054','10121','Pass Through 100%','17','No Sampling'),
    ('500005052','P000000086','11120','Pass Through 100%','29','No Sampling'),
    ('500005052','P000000087','11120','Pass Through 100%','19','No Sampling'),
    ('500005052','P000000272','11120','Pass Through 100%','32','No Sampling'),
    ('500005052','P000000284','10121','Pass Through 100%','17','No Sampling'),
    ('500005052','P000000395','11120','Pass Through 100%','15','No Sampling'),
    ('500005052','P000000412','10121','Pass Through 100%','21','No Sampling'),
    ('500005052','P000020194','11120','Pass Through 100%','15','No Sampling'),
    ('500005333','P000001940','10121','Pass Through 100%','17','No Sampling'),
    ('A101','C000000576','10111','Pass Through 100%','44','No Sampling'),
    ('A101','V041300004','10111','Pass Through 100%','62','No Sampling'),
    ('A101','V041300005','10111','Pass Through 100%','82','No Sampling'),
    ('A101','V050400010','10011','Pass Through 100%','6','No Sampling'),
    ('A101','V0713H0001','10111','Pass Through 100%','16632','No Sampling'),
    ('A101','V0715J0001','10111','Pass Through 100%','2119','No Sampling'),
    ('A101','V0715KK001','10111','Pass Through 100%','25959','No Sampling'),
    ('A101','V080400001','10111','Pass Through 100%','72','No Sampling'),
    ('A101','V100700001','10111','Pass Through 100%','76','No Sampling'),
    ('A101','V161200004','10011','Pass Through 100%','8','No Sampling'),
    ('A101','V161500006','10011','Pass Through 100%','6','No Sampling'),
    ('A101','V169900011','10011','Pass Through 100%','3','No Sampling'),
    ('A101','V170200002','10011','Pass Through 100%','4','No Sampling'),
    ('A101','V170200010','10111','Pass Through 100%','104','No Sampling'),
    ('A101','V170400007','10111','Pass Through 100%','61','No Sampling'),
    ('A101','V170400016','10111','Pass Through 100%','85','No Sampling'),
    ('A101','V170500002','10111','Pass Through 100%','151','No Sampling'),
    ('A101','V170500007','10111','Pass Through 100%','43','No Sampling'),
    ('A101','V230000009','10011','Pass Through 100%','4','No Sampling'),
    ('A101','V340100012','10011','Pass Through 100%','3','No Sampling'),
    ('A101','V340100014','10011','Pass Through 100%','10','No Sampling'),
    ('A101','V340200006','10011','Pass Through 100%','7','No Sampling'),
    ('A101','V350000030','10011','Pass Through 100%','7','No Sampling'),
    ('A102','V010100001','10111','Pass Through 100%','1225231','No Sampling'),
    ('A102','V0107Q0001','10111','Pass Through 100%','4255916','No Sampling'),
    ('A102','V041300004','10011','Pass Through 100%','7','No Sampling'),
    ('A102','V041300005','10111','Pass Through 100%','19','No Sampling'),
    ('A102','V050400010','10011','Pass Through 100%','8','No Sampling'),
    ('A102','V0713H0001','10111','Pass Through 100%','354986','No Sampling'),
    ('A102','V0715J0001','10111','Pass Through 100%','4008055','No Sampling'),
    ('A102','V0715KK001','10111','Pass Through 100%','7203','No Sampling'),
    ('A102','V080400001','10111','Pass Through 100%','74','No Sampling'),
    ('A102','V100500001','10011','Pass Through 100%','9','No Sampling'),
    ('A102','V100700001','10011','Pass Through 100%','6','No Sampling'),
    ('A102','V100800001','10111','Pass Through 100%','91','No Sampling'),
    ('A102','V100800004','10011','Pass Through 100%','12','No Sampling'),
    ('A102','V160300009','10111','Pass Through 100%','2528','No Sampling'),
    ('A102','V160300014','10111','Pass Through 100%','68','No Sampling'),
    ('BH202','V160100017','11120','Pass Through 100%','51','No Sampling'),
    ('BH205','V160100017','11120','Pass Through 100%','64','No Sampling'),
    ('PB001','C000000535','10111','Pass Through 100%','77','No Sampling'),
    ('PB001','C000000544','10111','Pass Through 100%','25','No Sampling'),
    ('PB001','C000000546','10111','Pass Through 100%','15','No Sampling'),
    ('PB001','C000000553','10111','Pass Through 100%','43','No Sampling'),
    ('PB001','C000000555','10111','Pass Through 100%','32','No Sampling'),
    ('PB001','C000000557','10011','Pass Through 100%','6','No Sampling'),
    ('PB001','C000000561','10111','Pass Through 100%','28','No Sampling'),
    ('PB001','C000000566','10111','Pass Through 100%','86','No Sampling'),
    ('PB001','C000000571','10111','Pass Through 100%','16','No Sampling'),
    ('PB001','C000000580','10111','Pass Through 100%','18','No Sampling'),
    ('PB001','C000000586','10111','Pass Through 100%','50','No Sampling'),
    ('PB001','C000000597','10111','Pass Through 100%','63','No Sampling'),
    ('PB001','C000000601','10111','Pass Through 100%','25','No Sampling'),
    ('PB001','C000001538','10111','Pass Through 100%','20','No Sampling'),
    ('PB001','V100800004','10011','Pass Through 100%','3','No Sampling'),
    ('PB001','V130000009','10111','Pass Through 100%','83','No Sampling'),
    ('PB001','V160300013','10111','Pass Through 100%','139','No Sampling'),
    ('PB001','V160300027','10111','Pass Through 100%','1113','No Sampling'),
    ('PB001','V160600004','10011','Pass Through 100%','1','No Sampling'),
    ('PB001','V161400006','10011','Pass Through 100%','4','No Sampling'),
    ('PB001','V161500011','10011','Pass Through 100%','11','No Sampling'),
    ('PB001','V170200001','10111','Pass Through 100%','44','No Sampling'),
    ('PB001','V170200006','10111','Pass Through 100%','109','No Sampling'),
    ('PB001','V170400007','10111','Pass Through 100%','209','No Sampling'),
    ('PB001','V170400016','10111','Pass Through 100%','386','No Sampling'),
    ('PB001','V170700002','10111','Pass Through 100%','191','No Sampling'),
    ('PB001','V170700010','10111','Pass Through 100%','74','No Sampling'),
    ('PB001','V170800001','10111','Pass Through 100%','40','No Sampling'),
    ('PB001','V190200001','10111','Pass Through 100%','36','No Sampling'),
    ('PB001','V190200004','10111','Pass Through 100%','33','No Sampling'),
    ('PB001','V190200005','10011','Pass Through 100%','8','No Sampling'),
    ('PB001','V190200006','10111','Pass Through 100%','154','No Sampling'),
    ('PB001','V190200007','10111','Pass Through 100%','132','No Sampling'),
    ('PB001','V190200008','10111','Pass Through 100%','29','No Sampling'),
    ('PB001','V190200041','10111','Pass Through 100%','60','No Sampling'),
    ('PB001','V190200076','10111','Pass Through 100%','27','No Sampling'),
    ('PB001','V190300004','10111','Pass Through 100%','51','No Sampling'),
    ('PB001','V190300005','10111','Pass Through 100%','49','No Sampling'),
    ('PB001','V190300020','10011','Pass Through 100%','13','No Sampling'),
    ('PB001','V190300024','10111','Pass Through 100%','98','No Sampling'),
    ('PB001','V190300025','10111','Pass Through 100%','89','No Sampling'),
    ('PB001','V190300082','10111','Pass Through 100%','40','No Sampling'),
    ('PB001','V210000002','10111','Pass Through 100%','28','No Sampling'),
    ('PB001','V210000068','10111','Pass Through 100%','103','No Sampling'),
    ('PB001','V230000021','10111','Pass Through 100%','66','No Sampling'),
    ('PB001','V230000026','10111','Pass Through 100%','19','No Sampling'),
    ('PB001','V230000027','10111','Pass Through 100%','80','No Sampling'),
    ('PB001','V230000039','10111','Pass Through 100%','28','No Sampling'),
    ('PB001','V230000055','10111','Pass Through 100%','30','No Sampling'),
    ('PB001','V300000060','10111','Pass Through 100%','18','No Sampling'),
    ('PB001','V300000139','10011','Pass Through 100%','14','No Sampling'),
    ('PB001','V310000004','10111','Pass Through 100%','55','No Sampling'),
    ('PB001','V320000010','10111','Pass Through 100%','40','No Sampling'),
    ('PB001','V320000040','10111','Pass Through 100%','37','No Sampling'),
    ('PB001','V320000068','10111','Pass Through 100%','97','No Sampling'),
    ('PB001','V330100042','10111','Pass Through 100%','20','No Sampling'),
    ('PB001','V330100043','10111','Pass Through 100%','69','No Sampling'),
    ('PB001','V330200008','10111','Pass Through 100%','26','No Sampling'),
    ('PB001','V330200017','10011','Pass Through 100%','1','No Sampling'),
    ('PB001','V330200035','10111','Pass Through 100%','42','No Sampling'),
    ('PB001','V340100033','10111','Pass Through 100%','21','No Sampling'),
    ('PB001','V340300012','10111','Pass Through 100%','31','No Sampling'),
    ('PB001','V349900005','10011','Pass Through 100%','1','No Sampling'),
    ('PB001','V350000015','10111','Pass Through 100%','24','No Sampling'),
    ('PB001','V350000040','10011','Pass Through 100%','14','No Sampling'),
    ('PB001','V370100033','10011','Pass Through 100%','1','No Sampling'),
    ('PB001','V370100034','10011','Pass Through 100%','2','No Sampling'),
    ('PB001','V370200083','10011','Pass Through 100%','1','No Sampling'),
    ('PB001','V370200084','10011','Pass Through 100%','1','No Sampling'),
    ('PC001','V530100004','10121','Pass Through 100%','62','No Sampling');

